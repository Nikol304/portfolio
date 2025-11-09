// theme.js — injects a theme toggle into .nav-inner and persists choice in localStorage
(function(){
  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function createButton(){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label','Toggle dark mode');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 13.66l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 5a7 7 0 100 14 7 7 0 000-14zm0-3h-1v3h1V2zM4 11H1v1h3v-1zm19 0h-3v1h3v-1zM6.76 19.16l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zM17.24 4.84l1.42 1.41 1.8-1.8-1.41-1.41-1.81 1.8zM12 19a1 1 0 110 2 1 1 0 010-2z"></path></svg>' +
      '<span class="theme-label">Dark</span>';

    btn.addEventListener('click', function(){
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      updateLabel(newTheme);
    });
    return btn;
  }

  function updateLabel(theme){
    var el = document.querySelector('#theme-toggle .theme-label');
    if(!el) return;
    el.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }

  document.addEventListener('DOMContentLoaded', function(){
    // choose initial theme: saved preference -> system preference -> light
    var saved = localStorage.getItem('theme');
    var initial = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(initial);

    // create and insert button into nav
    var navInner = document.querySelector('.nav-inner');
    if(navInner){
      var btn = createButton();
      // insert as last child of nav-inner
      navInner.appendChild(btn);
      updateLabel(initial);
    }
  });
})();
