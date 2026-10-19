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
  return stage >= 2 ? customerSets.crowded : customerSets.uniform;
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
    const radius = stage >= 2 && index < 60
      ? CUSTOMER_RADIUS + (index % 3 - 1) * 8
      : CUSTOMER_RADIUS;
    const point = polarPoint(customer, radius);
    const winners = allocation.assignments[index];
    const switched = baselineAssignments &&
      winners.join(",") !== baselineAssignments[index].join(",");
    return svgElement("circle", {
      class: (winners.length === 1 ? "customer customer--" + winners[0] : "customer customer--tie") +
        (switched ? " customer--switched" : ""),
      cx: point.x,
      cy: point.y,
      r: 4.1,
    });
  });
  ui.customers.replaceChildren(...dots);

  const ghosts = stage === 3 && roundPhase === "revealed" && oldRivalPositions
    ? [1, 2].flatMap((index) => {
      if (Math.abs(oldRivalPositions[index] - activePositions()[index]) < 1e-10) return [];
      const point = polarPoint(oldRivalPositions[index], VENDOR_RADIUS);
      return [svgElement("circle", {
        class: "previous-marker previous-marker--" + index,
        cx: point.x,
        cy: point.y,
        r: 18,
      })];
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

  ui.crowdHighlight.hidden = stage < 2;
  ui.beachSubtitle.textContent = stage >= 2
    ? "60 clustered · 40 elsewhere"
    : "100 customers · 3 stands";
  ui.svg.querySelector("#beach-description").textContent =
    stage === 0
      ? "One hundred customers are evenly spaced around the shore. Move stand A or use its slider to change which stand they choose."
      : stage === 1
        ? "The customers and stand A remain in place. Move stand B or use its slider to see how customer choices change."
        : stage === 2
          ? "The stands have not moved. Sixty customers now occupy the highlighted quarter of the shore, and forty occupy the rest."
          : roundPhase === "choose"
            ? "Customers remain clustered. Choose stand A's next location; the current colors show what would happen if B and C stayed."
            : "B and C have moved. Dashed circles mark their previous positions. Gold outlines mark customers whose chosen stand changed from the stay-put estimate.";
}

function renderStageText() {
  const titles = [
    "Pick your spot",
    "What if B moves?",
    "What if customers gather elsewhere?",
    "Tomorrow, everyone chooses again",
  ];
  const prompts = [
    "Drag the green A stand around the shore. Each dot is a customer choosing the nearest stand.",
    "Keep A where you placed it. Drag orange B and watch what happens to A's customers.",
    "The stands stay exactly where they are. Most customers now gather along one quarter of the shore.",
    "Choose A's position before knowing where B and C will go. Then predict what happens.",
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
      ? "Drag A; the dot colors show where customers go."
      : stage === 1
        ? "Drag B. Gold outlines mark customers whose chosen stand changed."
        : stage === 2
          ? "The shaded arc contains 60 customers. None of the stands moved."
          : roundPhase === "choose"
            ? "Drag A. The colors show the stay-put estimate if B and C do not move."
            : "Dashed circles show where B and C stood before; gold outlines show changed customer choices.";
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
    : stage === 3 ? "After everyone moved" : "Your result";
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
          ? "With no stand moved, A changed from " + formatCount(crowdedBaseline.shares[0]) + " to " + formatCount(shares[0]) + " customers."
          : roundPhase === "choose"
            ? "This assumes B and C stay in yesterday's positions."
            : "This is A's actual result after B and C chose new positions.";

  ui.aSlider.value = Math.round(activePositions()[0] * CHOICE_COUNT) % CHOICE_COUNT;
  ui.bSlider.value = Math.round(activePositions()[1] * CHOICE_COUNT) % CHOICE_COUNT;
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
      : (sameShare
      ? "A still serves " + formatCount(allocation.shares[0]) + " customers."
      : "A went from " + formatCount(initialAllocation.shares[0]) + " to " +
        formatCount(allocation.shares[0]) + " customers.") +
      " Gold outlines mark the " + switched +
      " customers whose chosen stand changed. B and C stayed put.";
  } else if (stage === 1 && touched[1]) {
    title = "Your stand did not move";
    message = "B's move changed A's share from " + formatCount(competitionBaseline.shares[0]) +
      " to " + formatCount(allocation.shares[0]) + ". Gold outlines show the " +
      countSwitched(allocation.assignments, competitionBaseline.assignments) +
      " customers whose chosen stand changed.";
  } else if (stage === 2) {
    title = "Same stands, different demand";
    message = "With every stand fixed, A went from " + formatCount(crowdedBaseline.shares[0]) +
      " customers under even demand to " + formatCount(allocation.shares[0]) +
      " with a crowd in one quarter. A good location depends on where customers are.";
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
  const preview = allocateCustomers(customerSets.crowded, positions);
  const nextB = bestResponseToPrevious(customerSets.crowded, previous, 1, CHOICE_COUNT);
  const nextC = bestResponseToPrevious(customerSets.crowded, previous, 2, CHOICE_COUNT);
  previewAssignments = preview.assignments;
  oldRivalPositions = previous;
  positions[1] = nextB;
  positions[2] = nextC;
  roundPreviousPositions = [...positions];
  roundPhase = "revealed";
  day += 1;

  const actual = allocateCustomers(customerSets.crowded, positions);
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
  ui.roundExplanation.textContent = "B and C each chose using yesterday's positions. Dashed rings show where they stood before; gold outlines mark " +
    revealData.switched + " customers whose chosen stand changed from the stay-put picture. You predicted " +
    predictionLabels[prediction] + ".";
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
