"use strict";

const element = (id) => document.getElementById(id);
const menu = element("menu");
const game = element("game");
const code = element("code");
const pass = element("pass");
const next = element("next");
const feedback = element("feedback");
const keypad = element("keypad");
const toggle = element("key-toggle");
const startScreen = element("start-screen");
const roundScreen = element("round-screen");
const score = element("points");
const scoreStamps = document.querySelectorAll(".score-stamps span");
const touchLayout = window.matchMedia("(pointer: coarse), (hover: none)");

let touch = false;
let points = 0;
let destination = "";
let timer;
let deadline = 0;
let roundActive = false;

function showScore() {
  score.textContent = "Points: " + points + " / 5";
  scoreStamps.forEach((stamp, index) => stamp.classList.toggle("earned", index < points));
}

function showKeypad(open) {
  keypad.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
}

function finishRound(message) {
  clearInterval(timer);
  roundActive = false;
  code.disabled = true;
  pass.disabled = true;
  toggle.disabled = true;
  showKeypad(false);
  feedback.textContent = message;
  next.hidden = false;
  next.focus();
}

function tick() {
  const seconds = Math.max(0, Math.ceil((deadline - performance.now()) / 1000));
  element("clock").textContent = Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
  if (seconds === 0) finishRound("Time’s up. Try another delivery!");
}

function startRound() {
  clearInterval(timer);
  const origin = Math.floor(Math.random() * 10000);
  const nextAddress = (origin + 1 + Math.floor(Math.random() * 9999)) % 10000;
  element("origin").textContent = String(origin).padStart(4, "0");
  destination = String(nextAddress).padStart(4, "0");
  element("destination").textContent = destination;
  code.value = "";
  code.disabled = false;
  pass.disabled = false;
  toggle.disabled = false;
  next.hidden = true;
  feedback.textContent = "";
  roundActive = true;
  deadline = performance.now() + 50000;
  tick();
  timer = setInterval(tick, 150);
  (touch ? toggle : code).focus();
}

function openGame() {
  touch = touchLayout.matches;
  points = 0;
  showScore();
  startScreen.hidden = false;
  roundScreen.hidden = true;
  element("help").open = false;
  menu.hidden = true;
  game.hidden = false;
  document.body.classList.add("playing");
  code.readOnly = touch;
  toggle.hidden = !touch;
  element("instructions").textContent = touch
    ? "Tap Number pad to enter the code."
    : "Use the number keys on your keyboard.";
  element("start").focus();
}

element("open").addEventListener("click", openGame);
element("start").addEventListener("click", () => {
  startScreen.hidden = true;
  roundScreen.hidden = false;
  startRound();
});
element("end").addEventListener("click", () => {
  clearInterval(timer);
  roundActive = false;
  showKeypad(false);
  game.hidden = true;
  menu.hidden = false;
  document.body.classList.remove("playing");
  element("open").focus();
});
next.addEventListener("click", startRound);
toggle.addEventListener("click", () => showKeypad(keypad.hidden));
code.addEventListener("input", () => {
  code.value = code.value.replace(/[^0-9]/g, "").slice(0, 4);
});
element("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!roundActive) return;
  if (performance.now() >= deadline) {
    tick();
    return;
  }
  if (!/^[0-9]{4}$/.test(code.value)) {
    feedback.textContent = "Enter all four digits first.";
    return;
  }
  if (code.value !== destination) {
    finishRound("That address didn’t match. No point this time.");
    return;
  }
  points += 1;
  showScore();
  finishRound(points === 5 ? "You reached five points! Keep playing if you’d like." : "Delivered! You earned one point.");
});

for (const key of ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫"]) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = key;
  if (key === "⌫") button.setAttribute("aria-label", "Delete last digit");
  button.addEventListener("click", () => {
    if (!roundActive) return;
    code.value = key === "⌫" ? code.value.slice(0, -1) : (code.value + key).slice(0, 4);
  });
  keypad.append(button);
}
