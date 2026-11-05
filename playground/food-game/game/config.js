// Tunable playtest rules; no presentation or food text.
(function(root) {
  root.GameConfig = Object.freeze({
    mistakes: { easy: 3, medium: 2, hard: 1 },
    cpuAccuracy: { easy: 0.85, medium: 0.90, hard: 0.95 },
    cpuDelayMs: 1400,
    mealRounds: 4, healthyLimit: 3, unhealthyLimit: 1,
    meals: ['Breakfast', 'Lunch', 'Dinner'],
  });
})(globalThis);
