(() => {
  const section = document.querySelector('.post-conversation');
  if (!section) return;

  const actions = section.querySelector('.post-share-actions');
  const copyButton = actions.querySelector('[data-copy-link]');
  const shareButton = actions.querySelector('[data-share-link]');
  const status = actions.querySelector('.post-share-status');
  const url = new URL(
    document.querySelector('meta[property="og:url"]')?.content || window.location.href,
    window.location.href,
  ).href;

  actions.hidden = false;

  copyButton.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      status.textContent = 'Link copied.';
    } catch {
      status.textContent = 'Could not copy the link. Please copy the page address.';
    }
  });

  if (typeof navigator.share === 'function') {
    shareButton.hidden = false;
    shareButton.addEventListener('click', async () => {
      try {
        await navigator.share({
          title: document.querySelector('.post-header h1')?.textContent.trim() || document.title,
          url,
        });
        status.textContent = '';
      } catch (error) {
        if (error.name !== 'AbortError') {
          status.textContent = 'Could not open sharing. Try Copy link.';
        }
      }
    });
  }
})();
