// The complete outcomes remain readable when JavaScript is unavailable.
(() => {
  document.querySelectorAll('[data-decision-explorer]').forEach(explorer => {
    const controls = explorer.querySelector('[data-decision-controls]');
    const inputs = [...controls.querySelectorAll('input[type="radio"]')];
    const outcomes = [...explorer.querySelectorAll('[data-decision-outcome]')];
    if (!inputs.length || inputs.some(input => !outcomes.some(outcome => outcome.dataset.decisionOutcome === input.value))) return;

    const announcement = explorer.querySelector('[data-decision-announcement]');

    function update(initial = false) {
      const selected = inputs.find(input => input.checked);
      if (!selected) return;
      const previous = outcomes.find(outcome => !outcome.hidden);
      const previousFields = previous ? [...previous.querySelectorAll('[data-decision-field]')] : [];
      const previousText = new Map(previousFields
        .map(field => [field.dataset.decisionField, field.querySelector('dd').textContent]));
      const active = outcomes.find(outcome => outcome.dataset.decisionOutcome === selected.value);
      outcomes.forEach(outcome => {
        outcome.hidden = outcome !== active;
      });
      active.querySelectorAll('[data-decision-field]').forEach(field => {
        const text = field.querySelector('dd').textContent;
        field.dataset.changed = String(!initial && previousText.get(field.dataset.decisionField) !== text);
      });
      if (!initial && announcement) {
        const changes = [...active.querySelectorAll('[data-decision-field] dd')].map(field => field.textContent);
        announcement.textContent = `${selected.closest('label').textContent.trim()}. ${changes.join(' ')}`;
      }
    }

    controls.addEventListener('change', () => update());
    update(true);
    controls.hidden = false;
  });
})();
