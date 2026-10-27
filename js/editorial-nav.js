(() => {
  const button = document.querySelector('.editorial-header__menu');
  const navigation = document.querySelector('.editorial-header__nav');
  if (!button || !navigation) return;

  const markCurrent = () => {
    navigation.querySelectorAll('[aria-current]').forEach((link) => link.removeAttribute('aria-current'));
    const path = window.location.pathname;
    const section = path.startsWith('/posts/') ? '/posts/'
      : path.startsWith('/experiments/') ? '/experiments/'
      : path.startsWith('/toolbox/') ? '/toolbox/'
      : path.startsWith('/about') && window.location.hash === '#research' ? '/about/#research'
      : path.startsWith('/about') ? '/about/' : null;
    if (section) navigation.querySelector(`a[href="${section}"]`)?.setAttribute('aria-current', path === section || (path + window.location.hash) === section ? 'page' : 'location');
  };
  const markCollection = () => {
    document.querySelectorAll('.toolbox-collection-nav a').forEach((link) => {
      const current = window.location.pathname === '/toolbox/' && window.location.hash === '#decision-tools'
        ? '/toolbox/#decision-tools' : window.location.pathname;
      if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
  markCollection();
  window.addEventListener('hashchange', markCollection);
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
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      close();
      button.focus();
    }
  });
  navigation.closest('.editorial-header').classList.add('is-enhanced');
  window.matchMedia('(min-width: 821px)').addEventListener('change', close);
})();
