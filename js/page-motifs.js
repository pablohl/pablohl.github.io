/* Optional illustration poses only; no game state or stored preferences. */
document.querySelectorAll('[data-page-motif]').forEach((button) => {
  button.disabled = false;
  button.addEventListener('click', () => {
    button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
  });
});
