// The complete outcomes remain readable when JavaScript is unavailable.
(() => {
  document.querySelectorAll('[data-decision-explorer]').forEach(explorer => {
    const controls = explorer.querySelector('[data-decision-controls]');
    const inputs = [...controls.querySelectorAll('input[type="radio"]')];
    const outcomes = [...explorer.querySelectorAll('[data-decision-outcome]')];
    if (!inputs.length || inputs.some(input => !outcomes.some(outcome => outcome.dataset.decisionOutcome === input.value))) return;

    function update() {
      const selected = inputs.find(input => input.checked);
      if (!selected) return;
      outcomes.forEach(outcome => {
        outcome.hidden = outcome.dataset.decisionOutcome !== selected.value;
      });
    }

    controls.addEventListener('change', update);
    update();
    controls.hidden = false;
  });
})();
