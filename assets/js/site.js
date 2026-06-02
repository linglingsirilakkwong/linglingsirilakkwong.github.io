// site.js - 加载 header/footer 并初始化语言切换
async function loadPartial(id, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    const html = await res.text();
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (e) {
    console.error(e);
  }
}

function initLanguage() {
  const body = document.body;
  const btn = document.getElementById('langButton');
  const saved = localStorage.getItem('site-lang') || 'zh';
  setLang(saved);

  function setLang(l) {
    body.classList.remove('lang-zh','lang-en');
    body.classList.add(l === 'en' ? 'lang-en' : 'lang-zh');
    if (btn) btn.textContent = l === 'en' ? '中文' : 'EN';
    localStorage.setItem('site-lang', l);
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.body.classList.contains('lang-zh') ? 'en' : 'zh';
      setLang(next);
    });
  }
}

function highlightCurrentNav() {
  const anchors = document.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  anchors.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
    else a.classList.remove('active');
  });
}

async function initSite() {
  // Use relative paths to work on GH Pages and local http server
  if (document.getElementById('site-header')) await loadPartial('site-header', 'partials/header.html');
  if (document.getElementById('site-footer')) await loadPartial('site-footer', 'partials/footer.html');

  // small delay to ensure header html inserted before binding
  setTimeout(() => {
    initLanguage();
    highlightCurrentNav();
  }, 120);
}

document.addEventListener('DOMContentLoaded', initSite);
