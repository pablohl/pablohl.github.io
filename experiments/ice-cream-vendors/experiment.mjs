import { allocateCustomers, bestResponseToPrevious, crowdedQuarterCustomers, uniformCustomers } from "./model.mjs?v=20261017-3";

const NS = "http://www.w3.org/2000/svg";
const CENTER = 320;
const CUSTOMER_RADIUS = 196;
const VENDOR_RADIUS = 237;
const CUSTOMER_COUNT = 100;
const SLOT_COUNT = 12;
const INITIAL_POSITIONS = [0.06, 0.38, 0.72];
const INITIAL_ROUND_POSITIONS = [0, 4 / SLOT_COUNT, 9 / SLOT_COUNT];
const customerSets = {
  uniform: uniformCustomers(CUSTOMER_COUNT),
  crowded: crowdedQuarterCustomers(CUSTOMER_COUNT),
};
const svg = document.querySelector("[data-beach]");
const customerLayer = svg.querySelector("[data-customers]");
const slotLayer = svg.querySelector("[data-slots]");
const previousLayer = svg.querySelector("[data-previous-markers]");
const vendorLayer = svg.querySelector("[data-vendors]");
const controls = [...document.querySelectorAll("[data-vendor-control]")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const sandboxPositions = [...INITIAL_POSITIONS];
const roundPositions = [...INITIAL_ROUND_POSITIONS];
let positions = sandboxPositions;
let previousRoundPositions = [...roundPositions];
let oldRivalPositions = null;
let day = 0;
let roundPhase = "choose";
let prediction = null;
let previewAssignments = null;
let currentView = "uniform";
let draggedVendor = null;

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

function formatPercent(share) {
  return `${(share / CUSTOMER_COUNT * 100).toFixed(1).replace(/\.0$/, "")}%`;
}

function render() {
  const customers = currentView === "crowded" ? customerSets.crowded : customerSets.uniform;
  const { assignments, shares } = allocateCustomers(customers, positions);
  const evenShares = currentView === "crowded"
    ? allocateCustomers(customerSets.uniform, positions).shares
    : null;
  const dots = customers.map((customer, index) => {
    const radius = currentView === "crowded" && index < 60
      ? CUSTOMER_RADIUS + (index % 3 - 1) * 8
      : CUSTOMER_RADIUS;
    const point = polarPoint(customer, radius);
    const winner = assignments[index];
    const switched = currentView === "next-day" && roundPhase === "revealed" &&
      previewAssignments && winner.join(",") !== previewAssignments[index].join(",");
    return svgElement("circle", {
      class: `${winner.length === 1 ? `customer customer--${winner[0]}` : "customer customer--tie"}${switched ? " customer--switched" : ""}`,
      cx: point.x,
      cy: point.y,
      r: 4.1,
    });
  });
  customerLayer.replaceChildren(...dots);

  if (currentView === "next-day") {
    slotLayer.replaceChildren(...Array.from({ length: SLOT_COUNT }, (_, index) => {
      const point = polarPoint(index / SLOT_COUNT, VENDOR_RADIUS);
      return svgElement("circle", { class: "slot-dot", cx: point.x, cy: point.y, r: 5 });
    }));
  } else {
    slotLayer.replaceChildren();
  }

  const ghosts = currentView === "next-day" && oldRivalPositions
    ? [1, 2].flatMap((index) => {
      if (Math.abs(oldRivalPositions[index] - positions[index]) < 1e-10) return [];
      const point = polarPoint(oldRivalPositions[index], VENDOR_RADIUS);
      return [svgElement("circle", {
        class: `previous-marker previous-marker--${index}`,
        cx: point.x,
        cy: point.y,
        r: 17,
      })];
    })
    : [];
  previousLayer.replaceChildren(...ghosts);

  const markers = positions.map((position, index) => {
    const point = polarPoint(position, VENDOR_RADIUS);
    const marker = svgElement("g", {
      class: `vendor-marker vendor-marker--${index}${currentView === "next-day" && index > 0 ? " vendor-marker--locked" : ""}`,
      "data-vendor": index,
      transform: `translate(${point.x} ${point.y})`,
    });
    marker.append(
      svgElement("circle", { class: "vendor-hit-area", r: 28 }),
      svgElement("circle", { class: "vendor-disc", r: 19 }),
      svgElement("text", { "text-anchor": "middle", dy: "0.36em" })
    );
    marker.lastChild.textContent = String.fromCharCode(65 + index);
    return marker;
  });
  vendorLayer.replaceChildren(...markers);

  controls.forEach((control, index) => {
    const input = control.querySelector("input");
    input.value = currentView === "next-day"
      ? Math.round(positions[index] * SLOT_COUNT) % SLOT_COUNT
      : Math.round(positions[index] * 360) % 360;
    input.disabled = currentView === "next-day" && (index > 0 || roundPhase === "revealed");
    const percentage = formatPercent(shares[index]);
    control.querySelector("output").textContent = percentage;
    control.querySelector("[data-share-bar]").style.width = percentage;
    const delta = control.querySelector("[data-share-delta]");
    delta.hidden = !evenShares;
    if (evenShares) {
      const change = (shares[index] - evenShares[index]) / CUSTOMER_COUNT * 100;
      const amount = Math.abs(change).toFixed(1).replace(/\.0$/, "");
      delta.textContent = `${change > 0 ? "+" : change < 0 ? "−" : ""}${amount} pp vs evenly spread`;
    }
  });

  if (currentView === "next-day") {
    document.body.classList.toggle("round-choose-phase", roundPhase === "choose");
    document.body.classList.toggle("round-revealed-phase", roundPhase === "revealed");
    document.querySelector("[data-results-title]").textContent = roundPhase === "choose" ? "Your move" : "What happened";
    document.querySelector("[data-round-planning]").hidden = roundPhase !== "choose";
    document.querySelector("[data-round-reveal]").hidden = roundPhase !== "revealed";
    document.querySelector("[data-plan-next]").hidden = roundPhase !== "revealed";
    document.querySelector("[data-round-hint]").textContent = roundPhase === "choose"
      ? "Choose A’s next location by dragging or using its slider. The twelve pale dots are available spots. The colored customers show what would happen if B and C stayed put."
      : "Dashed circles mark where B and C stood before moving. Gold outlines mark customers whose choice changed.";
    document.querySelector("[data-preview-share]").textContent = formatPercent(shares[0]);
    document.querySelector("[data-next-day]").disabled = prediction === null;
    document.querySelector("[data-round-prompt]").textContent = prediction === null
      ? "Choose a prediction to reveal the next day. “Not sure” is fine."
      : "Ready? Reveal B and C’s choices.";
    document.querySelectorAll("[data-prediction]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.prediction === prediction));
    });
    document.querySelector("[data-round-history-wrap]").hidden = roundPhase !== "revealed" || day === 0;
    updateRoundStatus();
  } else {
    document.body.classList.remove("round-choose-phase", "round-revealed-phase");
    document.querySelector("[data-results-title]").textContent = "Customer share";
  }
}

function updateRoundStatus() {
  const label = document.querySelector("[data-round-label]");
  const message = document.querySelector("[data-round-message]");
  if (roundPhase === "choose") {
    label.textContent = `Choose for Day ${day + 1}`;
    message.textContent = day === 0
      ? "These are the starting positions. Place A for Day 1; B and C may move too."
      : `These are Day ${day}’s positions. Place A for Day ${day + 1}; B and C may move too.`;
  } else {
    label.textContent = `Day ${day} revealed`;
    message.textContent = "Now compare what happened with your estimate, then try another day.";
  }
}

function showView(view) {
  currentView = view;
  positions = view === "next-day" ? roundPositions : sandboxPositions;
  document.body.classList.toggle("round-mode", view === "next-day");
  viewButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.view === view));
  });
  document.querySelectorAll("[data-visible-in]").forEach((element) => {
    element.toggleAttribute("hidden", element.dataset.visibleIn !== view);
  });
  document.querySelectorAll("[data-hide-in]").forEach((element) => {
    element.toggleAttribute("hidden", element.dataset.hideIn === view);
  });
  controls.forEach((control) => {
    const input = control.querySelector("input");
    input.max = view === "next-day" ? "11" : "359";
    input.step = "1";
  });
  controls[0].querySelector("input").setAttribute("aria-label", view === "next-day"
    ? "Your stand location, one of twelve spots around the beach"
    : "Your stand position around the beach");
  svg.querySelector("#beach-description").textContent = view === "crowded"
    ? "Sixty customers occupy the highlighted quarter of the shore, and forty are spread along the rest. Each customer visits the nearest stand along the circular shore. Drag a labelled stand or use its position slider to change the results."
    : view === "next-day"
      ? "One hundred customers are evenly spaced around the beach. Choose your stand from twelve locations. The other two stands choose independently from last day's positions when the next day is revealed."
      : "One hundred customers are evenly spaced around the beach. Each customer visits the nearest stand along the circular shore. Drag a labelled stand or use its position slider to change the results.";
  svg.querySelector("[data-beach-subtitle]").textContent = view === "crowded"
    ? "60 in one quarter · 40 elsewhere"
    : view === "next-day" ? "100 customers · 12 possible spots" : "100 customers · 3 stands";
  render();
}

function turnFromPointer(event) {
  const rectangle = svg.getBoundingClientRect();
  const x = (event.clientX - rectangle.left) / rectangle.width * 640 - CENTER;
  const y = (event.clientY - rectangle.top) / rectangle.height * 640 - CENTER;
  const turn = (Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI);
  return (turn + 1) % 1;
}

function snapToSlot(turn) {
  return Math.round(turn * SLOT_COUNT) % SLOT_COUNT / SLOT_COUNT;
}

controls.forEach((control, index) => {
  control.querySelector("input").addEventListener("input", (event) => {
    positions[index] = currentView === "next-day"
      ? Number(event.currentTarget.value) / SLOT_COUNT
      : Number(event.currentTarget.value) / 360;
    if (currentView === "next-day") prediction = null;
    render();
  });
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

svg.addEventListener("pointerdown", (event) => {
  const marker = event.target.closest("[data-vendor]");
  if (!marker) return;
  const index = Number(marker.dataset.vendor);
  if (currentView === "next-day" && (index > 0 || roundPhase === "revealed")) return;
  draggedVendor = index;
  svg.setPointerCapture(event.pointerId);
  const turn = turnFromPointer(event);
  positions[draggedVendor] = currentView === "next-day" ? snapToSlot(turn) : turn;
  if (currentView === "next-day") prediction = null;
  render();
  event.preventDefault();
});

svg.addEventListener("pointermove", (event) => {
  if (draggedVendor === null) return;
  const turn = turnFromPointer(event);
  positions[draggedVendor] = currentView === "next-day" ? snapToSlot(turn) : turn;
  if (currentView === "next-day") prediction = null;
  render();
});

function stopDragging() {
  draggedVendor = null;
}

svg.addEventListener("pointerup", stopDragging);
svg.addEventListener("pointercancel", stopDragging);
svg.addEventListener("lostpointercapture", stopDragging);

document.querySelector("[data-reset]").addEventListener("click", () => {
  positions.splice(0, positions.length, ...INITIAL_POSITIONS);
  render();
});

document.querySelector("[data-randomize]").addEventListener("click", () => {
  positions.splice(0, positions.length, ...positions.map(() => Math.random()));
  render();
});

document.querySelectorAll("[data-prediction]").forEach((button) => {
  button.addEventListener("click", () => {
    prediction = button.dataset.prediction;
    render();
  });
});

document.querySelector("[data-next-day]").addEventListener("click", () => {
  if (roundPhase !== "choose" || prediction === null) return;
  const yesterday = [...previousRoundPositions];
  const preview = allocateCustomers(customerSets.uniform, roundPositions);
  const nextB = bestResponseToPrevious(customerSets.uniform, yesterday, 1, SLOT_COUNT);
  const nextC = bestResponseToPrevious(customerSets.uniform, yesterday, 2, SLOT_COUNT);
  previewAssignments = preview.assignments;
  oldRivalPositions = [...yesterday];
  roundPositions[1] = nextB;
  roundPositions[2] = nextC;
  previousRoundPositions = [...roundPositions];
  day += 1;
  roundPhase = "revealed";
  render();

  const actual = allocateCustomers(customerSets.uniform, roundPositions);
  const shares = actual.shares;
  const changed = actual.assignments.filter((winners, index) =>
    winners.join(",") !== previewAssignments[index].join(",")
  ).length;
  const expected = { higher: "higher", same: "about the same", lower: "lower", unsure: "unsure" }[prediction];
  document.querySelector("[data-round-result]").textContent =
    `If B and C stayed: A ${formatPercent(preview.shares[0])}. After they moved: A ${formatPercent(shares[0])}. You predicted ${expected}.`;
  const moves = [1, 2].map((index) => {
    const name = String.fromCharCode(65 + index);
    const from = Math.round(yesterday[index] * SLOT_COUNT) + 1;
    const to = Math.round(roundPositions[index] * SLOT_COUNT) + 1;
    return from === to ? `${name} stayed at spot ${to}` : `${name} moved from spot ${from} to ${to}`;
  });
  document.querySelector("[data-round-explanation]").textContent =
    `${moves.join("; ")}. ${changed} of 100 customers changed which stand they would visit compared with the stay-put estimate (gold outlines).`;
  const item = document.createElement("li");
  item.textContent = `Day ${day}: A ${formatPercent(shares[0])} · B ${formatPercent(shares[1])} · C ${formatPercent(shares[2])}`;
  document.querySelector("[data-round-history]").prepend(item);
  document.querySelector("[data-round-history-wrap]").hidden = false;
  document.querySelector("[data-round-reveal]").focus();
});

document.querySelector("[data-plan-next]").addEventListener("click", () => {
  roundPhase = "choose";
  prediction = null;
  previewAssignments = null;
  oldRivalPositions = null;
  render();
});

document.querySelector("[data-reset-rounds]").addEventListener("click", () => {
  roundPositions.splice(0, roundPositions.length, ...INITIAL_ROUND_POSITIONS);
  previousRoundPositions = [...roundPositions];
  oldRivalPositions = null;
  day = 0;
  roundPhase = "choose";
  prediction = null;
  previewAssignments = null;
  document.querySelector("[data-round-history]").replaceChildren();
  document.querySelector("[data-round-history-wrap]").hidden = true;
  render();
});

render();
