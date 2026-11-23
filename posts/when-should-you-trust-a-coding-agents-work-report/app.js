const buttons = [...document.querySelectorAll('[data-case]')];
const cases = [...document.querySelectorAll('.case')];
function selectCase(id) {
  for (const panel of cases) panel.hidden = panel.id !== id;
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.case === id));
}
document.querySelector('.case-buttons').hidden = false;
for (const button of buttons) button.addEventListener('click', () => selectCase(button.dataset.case));
selectCase('build');

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
