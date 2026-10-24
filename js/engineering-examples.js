// Enhance complete static examples into a keyboard-accessible tab set.
(() => {
  const selector = document.querySelector('[data-example-tabs]');
  if (!selector) return;
  const tabs = [...selector.querySelectorAll('[data-example-tab]')];
  const panels = tabs.map(tab => document.getElementById(tab.dataset.exampleTab));
  if (!tabs.length || panels.some(panel => !panel)) return;

  selector.setAttribute('role', 'tablist');
  selector.setAttribute('aria-label', 'Interview example');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
  });

  function select(index, updateHash = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (updateHash) {
      const url = new URL(window.location.href);
      url.hash = panels[index].id;
      history.replaceState(null, '', url);
    }
  }

  function selectFromHash() {
    const index = panels.findIndex(panel => `#${panel.id}` === location.hash);
    if (index !== -1) select(index);
    return index;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index, true));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next, true);
      tabs[next].focus();
    });
  });

  if (selectFromHash() === -1) select(0);
  selector.hidden = false;
  window.addEventListener('hashchange', selectFromHash);
})();
