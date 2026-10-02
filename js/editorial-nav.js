(() => {
  const button = document.querySelector('.editorial-header__menu');
  const navigation = document.querySelector('.editorial-header__nav');
  if (!button || !navigation) return;

  const markCurrent = () => {
    navigation.querySelectorAll('[aria-current]').forEach((link) => link.removeAttribute('aria-current'));
    const path = window.location.pathname;
    const section = path.startsWith('/posts/') ? '/posts/'
      : path.startsWith('/toolbox/') ? '/toolbox/'
      : path.startsWith('/about') && window.location.hash === '#research' ? '/about/#research'
      : path.startsWith('/about') ? '/about/' : null;
    if (section) navigation.querySelector(`a[href="${section}"]`)?.setAttribute('aria-current', 'page');
  };
  markCurrent();
  window.addEventListener('hashchange', markCurrent);

  const close = () => {
    navigation.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
  };
  button.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
      button.focus();
    }
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', close);
})();
