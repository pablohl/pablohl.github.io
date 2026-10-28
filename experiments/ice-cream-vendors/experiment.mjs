import { allocateCustomers, bestResponseToPrevious, crowdedQuarterCustomers, uniformCustomers } from "./model.mjs?v=20261017-3";

const NS = "http://www.w3.org/2000/svg";
const CENTER = 320;
const CUSTOMER_RADIUS = 196;
const VENDOR_RADIUS = 237;
const CUSTOMER_COUNT = 100;
const CHOICE_COUNT = 360;
const INITIAL_POSITIONS = [0.06, 0.38, 0.72];
const customerSets = {
  uniform: uniformCustomers(CUSTOMER_COUNT),
  crowded: crowdedQuarterCustomers(CUSTOMER_COUNT),
};
const initialAllocation = allocateCustomers(customerSets.uniform, INITIAL_POSITIONS);

const ui = {
  svg: document.querySelector("[data-beach]"),
  customers: document.querySelector("[data-customers]"),
  previousMarkers: document.querySelector("[data-previous-markers]"),
  vendors: document.querySelector("[data-vendors]"),
  crowdHighlight: document.querySelector(".crowd-highlight"),
  beachSubtitle: document.querySelector("[data-beach-subtitle]"),
  beachHint: document.querySelector("[data-beach-hint]"),
  keyChange: document.querySelector("[data-key-change]"),
  keyTie: document.querySelector("[data-key-tie]"),
  keyPrevious: document.querySelector("[data-key-previous]"),
  stepLabel: document.querySelector("[data-step-label]"),
  stageTitle: document.querySelector("[data-stage-title]"),
  stagePrompt: document.querySelector("[data-stage-prompt]"),
  progress: [...document.querySelectorAll("[data-progress]")],
  resultEyebrow: document.querySelector("[data-results-eyebrow]"),
  aShare: document.querySelector("[data-a-share]"),
  aCaption: document.querySelector("[data-a-caption]"),
  bShare: document.querySelector("[data-b-share]"),
  cShare: document.querySelector("[data-c-share]"),
  shareContext: document.querySelector("[data-share-context]"),
  tieNote: document.querySelector("[data-tie-note]"),
  demandControl: document.querySelector("[data-demand-control]"),
  demandButtons: [...document.querySelectorAll("[data-demand]")],
  aControl: document.querySelector("[data-a-control]"),
  bControl: document.querySelector("[data-b-control]"),
  aSlider: document.querySelector("#vendor-a"),
  bSlider: document.querySelector("#vendor-b"),
  planning: document.querySelector("[data-round-planning]"),
  revealButton: document.querySelector("[data-reveal-button]"),
  reveal: document.querySelector("[data-round-reveal]"),
  expectedCount: document.querySelector("[data-expected-count]"),
  actualCount: document.querySelector("[data-actual-count]"),
  difference: document.querySelector("[data-difference]"),
  roundExplanation: document.querySelector("[data-round-explanation]"),
  tryDay: document.querySelector("[data-try-day]"),
  roundMethod: document.querySelector("[data-round-method]"),
  predictionButtons: [...document.querySelectorAll("[data-prediction]")],
  reflection: document.querySelector("[data-reflection]"),
  reflectionTitle: document.querySelector("[data-reflection-title]"),
  reflectionText: document.querySelector("[data-reflection-text]"),
  back: document.querySelector("[data-back]"),
  next: document.querySelector("[data-next]"),
  reset: document.querySelector("[data-reset]"),
};

const stagePositions = [[...INITIAL_POSITIONS], null, null, null];
const touched = [false, false, false, false];
let stage = 0;
let demandMode = "crowded";
let competitionBaseline = null;
let crowdedBaseline = null;
let roundPreviousPositions = null;
let roundPhase = "choose";
let day = 0;
let prediction = null;
let previewAssignments = null;
let oldRivalPositions = null;
let revealData = null;
let draggedVendor = null;

function activePositions() {
  return stagePositions[stage];
}

function activeCustomers() {
  return stage >= 2 ? customerSets[demandMode] : customerSets.uniform;
}

function orientationText(turn) {
  const degrees = Math.round(turn * CHOICE_COUNT) % CHOICE_COUNT;
  const nearest = ["top", "right", "bottom", "left"][Math.round(degrees / 90) % 4];
  return `${degrees} degrees clockwise from top, near ${nearest}`;
}

function movableVendor() {
  if (stage === 0) return 0;
  if (stage === 1) return 1;
  if (stage === 3 && roundPhase === "choose") return 0;
  return null;
}

function formatCount(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

function shareComparison(current, previous, reference) {
  const difference = current - previous;
  if (Math.abs(difference) < 1e-10) {
    return "A serves the same number of customers it did " + reference + ".";
  }
  return "A serves " + formatCount(Math.abs(difference)) +
    (difference > 0 ? " more" : " fewer") + " customers than " + reference + ".";
}

function polarPoint(turn, radius) {
  const angle = turn * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(NS, name);
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, String(value));
  }
  return element;
}

function countSwitched(first, second) {
  return first.filter((winners, index) => winners.join(",") !== second[index].join(",")).length;
}

function renderBeach(allocation) {
  const customers = activeCustomers();
  let baselineAssignments = null;
  if (stage === 0 && touched[0]) baselineAssignments = initialAllocation.assignments;
  if (stage === 1 && touched[1]) baselineAssignments = competitionBaseline.assignments;
  if (stage === 3 && roundPhase === "revealed") baselineAssignments = previewAssignments;

  const dots = customers.map((customer, index) => {
    const radius = stage >= 2 && demandMode === "crowded" && index < 60
      ? CUSTOMER_RADIUS + (index % 3 - 1) * 8
      : CUSTOMER_RADIUS;
    const point = polarPoint(customer, radius);
    const winners = allocation.assignments[index];
    const switched = baselineAssignments &&
      winners.join(",") !== baselineAssignments[index].join(",");
    const className = (winners.length === 1 ? "customer customer--" + winners[0] : "customer customer--tie") +
      (switched ? " customer--switched" : "");
    return winners.length === 1
      ? svgElement("circle", { class: className, cx: point.x, cy: point.y, r: 4.1 })
      : svgElement("rect", {
        class: className, x: point.x - 3.5, y: point.y - 3.5,
        width: 7, height: 7, transform: `rotate(45 ${point.x} ${point.y})`,
      });
  });
  ui.customers.replaceChildren(...dots);

  const ghosts = stage === 3 && roundPhase === "revealed" && oldRivalPositions
    ? [1, 2].flatMap((index) => {
      if (Math.abs(oldRivalPositions[index] - activePositions()[index]) < 1e-10) return [];
      const point = polarPoint(oldRivalPositions[index], VENDOR_RADIUS);
      const marker = svgElement("g", { class: "previous-position" });
      marker.append(
        svgElement("circle", {
          class: "previous-marker previous-marker--" + index,
          cx: point.x, cy: point.y, r: 18,
        }),
        svgElement("text", {
          class: "previous-position__label", x: point.x, y: point.y - 27,
          "text-anchor": "middle",
        })
      );
      marker.lastChild.textContent = `${String.fromCharCode(65 + index)} before`;
      return [marker];
    })
    : [];
  ui.previousMarkers.replaceChildren(...ghosts);

  const movable = movableVendor();
  const markers = activePositions().map((position, index) => {
    const point = polarPoint(position, VENDOR_RADIUS);
    const marker = svgElement("g", {
      class: "vendor-marker vendor-marker--" + index +
        (index === movable ? "" : " vendor-marker--locked"),
      "data-vendor": index,
      transform: "translate(" + point.x + " " + point.y + ")",
    });
    marker.append(
      svgElement("circle", { class: "vendor-hit-area", r: 29 }),
      svgElement("circle", { class: "vendor-disc", r: 19 }),
      svgElement("text", { "text-anchor": "middle", dy: "0.36em" })
    );
    marker.lastChild.textContent = String.fromCharCode(65 + index);
    return marker;
  });
  ui.vendors.replaceChildren(...markers);

  ui.keyChange.hidden = !baselineAssignments || !countSwitched(allocation.assignments, baselineAssignments);
  ui.keyTie.hidden = !allocation.assignments.some((winners) => winners.length > 1);
  ui.keyPrevious.hidden = ghosts.length === 0;
  ui.crowdHighlight.hidden = stage < 2 || demandMode !== "crowded";
  ui.beachSubtitle.textContent = stage >= 2 && demandMode === "crowded"
    ? "60 clustered · 40 elsewhere"
    : "100 customers · 3 stands";
  ui.svg.querySelector("#beach-description").textContent =
    stage === 0
      ? "One hundred customers are evenly spaced around the shore. Move stand A or use its slider to change which stand they choose."
      : stage === 1
        ? "The customers and stand A remain in place. Move stand B or use its slider to see how customer choices change."
        : stage === 2
          ? demandMode === "crowded"
            ? "The stands have not moved. Sixty customers occupy the highlighted quarter of the shore, and forty occupy the rest. Toggle back to evenly spread customers to compare."
            : "The stands have not moved. One hundred customers are evenly spaced around the shore. Toggle to a crowded stretch to compare."
          : roundPhase === "choose"
            ? "The selected customer distribution stays fixed. Choose stand A's next location; the current colors show what would happen if B and C stayed."
            : "B and C have chosen. Dashed circles and labels mark any stand that moved. Dark outlines mark customers whose chosen stand changed from the stay-put estimate.";
}

function renderStageText() {
  const titles = [
    "Pick your spot",
    "What if B moves?",
    "What if customers gather elsewhere?",
    "Tomorrow, everyone chooses again",
  ];
  const prompts = [
    "Drag stand A around the shore, or use the “Move A with a slider” control. Watch how many customers choose A; each dot chooses its nearest stand.",
    "Keep A where you placed it. Drag orange B and watch what happens to A's customers.",
    "The stands stay exactly where they are. Compare evenly spread customers with a crowd along one quarter of the shore.",
    "Keep the selected customer pattern. Choose A's position before knowing where B and C will go, then predict the result.",
  ];
  ui.stepLabel.textContent = "Part " + (stage + 1) + " of 4";
  ui.stageTitle.textContent = stage === 3 && day > 0
    ? roundPhase === "choose" ? "Choose for Day " + (day + 1) : "Day " + day + " revealed"
    : titles[stage];
  ui.stagePrompt.textContent = stage === 3 && roundPhase === "revealed"
    ? "Compare your stay-put estimate with what happened after B and C chose."
    : prompts[stage];
  ui.progress.forEach((item, index) => {
    item.classList.toggle("is-complete", index < stage);
    if (index === stage) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  ui.beachHint.textContent =
    stage === 0
      ? "Drag A or use its position slider; the totals show where customers go."
      : stage === 1
        ? "Drag B. Dark outlines mark customers whose chosen stand changed."
        : stage === 2
          ? demandMode === "crowded"
            ? "The shaded arc contains 60 customers. Toggle back to compare; none of the stands move."
            : "Customers are spread evenly. Toggle to crowded; none of the stands move."
          : roundPhase === "choose"
            ? "Drag A. The colors show the stay-put estimate if B and C do not move."
            : oldRivalPositions && [1, 2].some((index) => Math.abs(oldRivalPositions[index] - activePositions()[index]) >= 1e-10)
              ? "Dashed circles show earlier stand positions; dark outlines show changed customer choices."
              : "B and C stayed in place; compare the result with your stay-put estimate.";
  ui.back.hidden = stage === 0;
  ui.next.hidden = stage === 3;
  ui.next.textContent = [
    "What if B moves? →",
    "Keep stands fixed; shift customers →",
    "What happens tomorrow? →",
  ][stage] || "";
}

function renderResults(allocation) {
  const shares = allocation.shares;
  ui.aShare.textContent = formatCount(shares[0]);
  ui.bShare.textContent = formatCount(shares[1]);
  ui.cShare.textContent = formatCount(shares[2]);
  ui.resultEyebrow.textContent = stage === 3 && roundPhase === "choose"
    ? "If B and C stay"
    : stage === 3 ? "After B and C chose" : "Your result";
  ui.aCaption.textContent = stage === 3 && roundPhase === "choose"
    ? "of 100 customers would choose A"
    : "of 100 customers choose A";
  ui.shareContext.textContent =
    stage === 0
      ? touched[0]
        ? shareComparison(shares[0], initialAllocation.shares[0], "at the start")
        : "Move A to see what changes."
      : stage === 1
        ? touched[1]
          ? shareComparison(shares[0], competitionBaseline.shares[0], "before B moved")
          : "A has not moved. Now try moving B."
        : stage === 2
          ? demandMode === "uniform"
            ? "Evenly spread customers are the baseline. Switch to the crowded stretch to compare."
            : "With all stands fixed, A changed from " + formatCount(crowdedBaseline.shares[0]) + " to " + formatCount(shares[0]) + " customers when demand shifted."
          : roundPhase === "choose"
            ? "This assumes B and C stay in yesterday's positions."
            : "This is A's result after B and C chose their positions.";

  const ties = allocation.assignments.filter((winners) => winners.length > 1);
  ui.tieNote.hidden = ties.length === 0;
  const rivalsShareLocation = Math.abs(activePositions()[1] - activePositions()[2]) < 1e-10;
  ui.tieNote.textContent = rivalsShareLocation && ties.length > 0
    ? `B and C chose the same spot. They split ${ties.length} equally close customers, so their totals may include halves.`
    : ties.length === 1 && ties[0].length === 2
    ? "One customer is equally close to two stands. Each receives half of that customer's share, which is why a total may end in .5."
    : `${ties.length} customers are equally close to multiple stands. Their shares are split evenly, so totals may include fractions.`;

  ui.demandControl.hidden = stage !== 2;
  ui.demandButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.demand === demandMode));
  });

  ui.aSlider.value = Math.round(activePositions()[0] * CHOICE_COUNT) % CHOICE_COUNT;
  ui.bSlider.value = Math.round(activePositions()[1] * CHOICE_COUNT) % CHOICE_COUNT;
  ui.aSlider.setAttribute("aria-valuetext", orientationText(activePositions()[0]));
  ui.bSlider.setAttribute("aria-valuetext", orientationText(activePositions()[1]));
  ui.aControl.hidden = !(stage === 0 || (stage === 3 && roundPhase === "choose"));
  ui.bControl.hidden = stage !== 1;
  ui.planning.hidden = !(stage === 3 && roundPhase === "choose");
  ui.reveal.hidden = !(stage === 3 && roundPhase === "revealed");
  ui.tryDay.hidden = !(stage === 3 && roundPhase === "revealed");
  ui.roundMethod.hidden = stage !== 3;
  ui.revealButton.disabled = prediction === null;
  ui.predictionButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.prediction === prediction));
  });
}

function renderReflection(allocation) {
  let title = "";
  let message = "";
  if (stage === 0 && touched[0]) {
    const sameShare = Math.abs(allocation.shares[0] - initialAllocation.shares[0]) < 1e-10;
    const switched = countSwitched(allocation.assignments, initialAllocation.assignments);
    title = switched === 0
      ? "Nothing changed yet"
      : sameShare
      ? "Your position changed who chose whom"
      : "Your position changed the result";
    message = switched === 0
      ? "This position produces the same customer choices as the starting one. Try another spot to see how the result changes."
      : (sameShare ? "Same total, different customers. " : "Your move changed the allocation. ") +
        `${switched} customers changed their chosen stand; B and C stayed put.`;
  } else if (stage === 1 && touched[1]) {
    title = "Your stand did not move";
    const switched = countSwitched(allocation.assignments, competitionBaseline.assignments);
    message = switched === 0
      ? "B moved, but no customer changed stands. Try another position to see whether A's result changes."
      : `B moved while A stayed put. ${switched} customers changed their chosen stand.`;
  } else if (stage === 2 && demandMode === "crowded") {
    title = "Same stands, different demand";
    const switched = countSwitched(allocation.assignments, crowdedBaseline.assignments);
    message = switched === 0
      ? "The customer pattern changed, but choices did not. The same stands still serve the same customers."
      : "No stand moved. Customers gathering in one stretch changed which stand was nearest for " +
        switched + " of them.";
  }
  ui.reflection.hidden = !message;
  ui.reflectionTitle.textContent = title;
  ui.reflectionText.textContent = message;
}

function render() {
  const allocation = allocateCustomers(activeCustomers(), activePositions());
  renderBeach(allocation);
  renderStageText();
  renderResults(allocation);
  renderReflection(allocation);
}

function updatePosition(index, turn) {
  if (movableVendor() !== index) return;
  activePositions()[index] = turn;
  touched[stage] = true;
  if (stage === 3) prediction = null;
  render();
}

function turnFromPointer(event) {
  const rectangle = ui.svg.getBoundingClientRect();
  const x = (event.clientX - rectangle.left) / rectangle.width * 640 - CENTER;
  const y = (event.clientY - rectangle.top) / rectangle.height * 640 - CENTER;
  const turn = (Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI);
  return (turn + 1) % 1;
}

ui.aSlider.addEventListener("input", (event) => {
  updatePosition(0, Number(event.currentTarget.value) / CHOICE_COUNT);
});
ui.bSlider.addEventListener("input", (event) => {
  updatePosition(1, Number(event.currentTarget.value) / CHOICE_COUNT);
});
ui.demandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (stage !== 2) return;
    demandMode = button.dataset.demand;
    render();
  });
});
ui.svg.addEventListener("pointerdown", (event) => {
  const marker = event.target.closest("[data-vendor]");
  if (!marker) return;
  const index = Number(marker.dataset.vendor);
  if (index !== movableVendor()) return;
  draggedVendor = index;
  ui.svg.setPointerCapture(event.pointerId);
  updatePosition(index, turnFromPointer(event));
  event.preventDefault();
});
ui.svg.addEventListener("pointermove", (event) => {
  if (draggedVendor !== null) updatePosition(draggedVendor, turnFromPointer(event));
});
function stopDragging() {
  draggedVendor = null;
}
ui.svg.addEventListener("pointerup", stopDragging);
ui.svg.addEventListener("pointercancel", stopDragging);
ui.svg.addEventListener("lostpointercapture", stopDragging);

ui.next.addEventListener("click", () => {
  if (stage === 0) {
    stagePositions[1] = [...stagePositions[0]];
    competitionBaseline = allocateCustomers(customerSets.uniform, stagePositions[1]);
    touched[1] = false;
  } else if (stage === 1) {
    stagePositions[2] = [...stagePositions[1]];
    crowdedBaseline = allocateCustomers(customerSets.uniform, stagePositions[2]);
  } else if (stage === 2) {
    stagePositions[3] = [...stagePositions[2]];
    roundPreviousPositions = [...stagePositions[3]];
    roundPhase = "choose";
    day = 0;
    prediction = null;
    previewAssignments = null;
    oldRivalPositions = null;
    revealData = null;
  } else {
    return;
  }
  stage += 1;
  render();
  ui.stageTitle.focus();
});
ui.back.addEventListener("click", () => {
  if (stage === 0) return;
  stage -= 1;
  render();
  ui.stageTitle.focus();
});
ui.reset.addEventListener("click", () => {
  stage = 0;
  demandMode = "crowded";
  stagePositions[0] = [...INITIAL_POSITIONS];
  stagePositions[1] = null;
  stagePositions[2] = null;
  stagePositions[3] = null;
  touched.fill(false);
  competitionBaseline = null;
  crowdedBaseline = null;
  roundPreviousPositions = null;
  roundPhase = "choose";
  day = 0;
  prediction = null;
  previewAssignments = null;
  oldRivalPositions = null;
  revealData = null;
  render();
  ui.stageTitle.focus();
});

ui.predictionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    prediction = button.dataset.prediction;
    render();
  });
});
ui.revealButton.addEventListener("click", () => {
  if (stage !== 3 || roundPhase !== "choose" || prediction === null) return;
  const previous = [...roundPreviousPositions];
  const positions = stagePositions[3];
  const customers = activeCustomers();
  const preview = allocateCustomers(customers, positions);
  const nextB = bestResponseToPrevious(customers, previous, 1, CHOICE_COUNT);
  const nextC = bestResponseToPrevious(customers, previous, 2, CHOICE_COUNT);
  previewAssignments = preview.assignments;
  oldRivalPositions = previous;
  positions[1] = nextB;
  positions[2] = nextC;
  roundPreviousPositions = [...positions];
  roundPhase = "revealed";
  day += 1;

  const actual = allocateCustomers(customers, positions);
  revealData = {
    expected: preview.shares[0],
    actual: actual.shares[0],
    switched: countSwitched(actual.assignments, preview.assignments),
  };
  ui.expectedCount.textContent = formatCount(revealData.expected);
  ui.actualCount.textContent = formatCount(revealData.actual);
  const difference = revealData.actual - revealData.expected;
  ui.difference.textContent = Math.abs(difference) < 1e-10
    ? "A served the same number as the stay-put estimate."
    : "A served " + formatCount(Math.abs(difference)) +
      (difference > 0 ? " more" : " fewer") + " customers than the stay-put estimate.";
  const predictionLabels = {
    higher: "more",
    same: "about the same",
    lower: "fewer",
    unsure: "not sure",
  };
  ui.roundExplanation.textContent = "You predicted " + predictionLabels[prediction] + ". B and C each chose using yesterday's positions. " +
    (revealData.switched === 0
      ? "No customer changed stands from the stay-put picture."
      : "Dark outlines mark " + revealData.switched + " customers whose chosen stand changed from the stay-put picture.") +
    ([1, 2].some((index) => Math.abs(oldRivalPositions[index] - positions[index]) >= 1e-10)
      ? " Dashed rings labeled ‘before’ mark the competitors' earlier positions."
      : " Neither competitor changed position this time.");
  render();
  ui.reveal.focus();
});
ui.tryDay.addEventListener("click", () => {
  roundPhase = "choose";
  roundPreviousPositions = [...stagePositions[3]];
  prediction = null;
  previewAssignments = null;
  oldRivalPositions = null;
  revealData = null;
  render();
  ui.stageTitle.focus();
});

render();
