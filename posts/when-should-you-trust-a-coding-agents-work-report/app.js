const buttons = [...document.querySelectorAll('[data-case]')];
const cases = [...document.querySelectorAll('.case')];
const readings = { build: 'not-established', failure: 'contradicted', success: 'supported' };
const labels = { supported: 'Supported', 'not-established': 'Not established', contradicted: 'Contradicted' };
function selectCase(id) {
  for (const panel of cases) panel.hidden = panel.id !== id;
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.case === id));
}
for (const panel of cases) {
  const assessment = panel.querySelector('.record-assessment');
  const feedback = panel.querySelector('.judgment-feedback');
  const choices = [...panel.querySelectorAll('[data-judgment]')];
  panel.querySelector('.judgment-controls').hidden = false;
  assessment.hidden = true;
  for (const button of choices) button.addEventListener('click', () => {
    const choice = button.dataset.judgment;
    for (const candidate of choices) candidate.setAttribute('aria-pressed', String(candidate.dataset.judgment === choice));
    const reading = readings[panel.id];
    feedback.textContent = `You chose ${labels[choice]}. My reading: ${labels[reading]}${panel.id === 'success' ? ' for fresh-database startup on B' : ''}. ${choice === reading ? 'Our judgments agree.' : 'Compare the evidence with my explanation below.'}`;
    assessment.hidden = false;
    assessment.open = true;
  });
}
document.querySelector('.case-buttons').hidden = false;
for (const button of buttons) button.addEventListener('click', () => selectCase(button.dataset.case));
selectCase('build');
document.querySelector('.inspection-note').textContent = 'Try another record or change your answer. Each record keeps its answer while this page is open; reloading starts over.';

const copySkillButton = document.querySelector('#copy-skill');
const skillSource = document.querySelector('#skill-source-text');
const copyStatus = document.querySelector('#copy-skill-status');
copySkillButton.hidden = false;
copySkillButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(skillSource.textContent);
    copyStatus.textContent = 'Full skill copied. Paste it into SKILL.md.';
  } catch {
    document.querySelector('.skill-source-details').open = true;
    const range = document.createRange();
    range.selectNodeContents(skillSource);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Automatic copy is unavailable. The full skill is selected; use your device’s Copy command, or download SKILL.md.';
  }
});
