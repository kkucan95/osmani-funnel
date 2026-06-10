(function () {
  var KEY = 'osmani_consent';
  try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }

  function decide(state) {
    try { localStorage.setItem(KEY, state); } catch (e) {}
    if (state === 'granted' && typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
    var b = document.getElementById('osmani-consent');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }

  var css =
    '#osmani-consent{position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#1c2b22;color:#e8eee9;' +
    'box-shadow:0 -2px 16px rgba(0,0,0,.25);font-family:inherit;font-size:14px;line-height:1.55}' +
    '#osmani-consent .oc-inner{max-width:1100px;margin:0 auto;padding:14px 18px;display:flex;gap:16px;' +
    'align-items:center;justify-content:space-between;flex-wrap:wrap}' +
    '#osmani-consent .oc-text{margin:0;flex:1 1 320px}' +
    '#osmani-consent a{color:#8fd6a8;text-decoration:underline}' +
    '#osmani-consent .oc-btns{display:flex;gap:10px;flex:0 0 auto}' +
    '#osmani-consent .oc-btn{cursor:pointer;border-radius:8px;padding:10px 22px;font-size:14px;font-weight:600;' +
    'border:1px solid transparent;font-family:inherit}' +
    '#osmani-consent .oc-reject{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}' +
    '#osmani-consent .oc-reject:hover{background:rgba(255,255,255,.12)}' +
    '#osmani-consent .oc-accept{background:#3b9c5a;color:#fff}' +
    '#osmani-consent .oc-accept:hover{background:#318049}' +
    '@media(max-width:560px){#osmani-consent .oc-btns{width:100%}#osmani-consent .oc-btn{flex:1}}';

  function init() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var bar = document.createElement('div');
    bar.id = 'osmani-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie-Einwilligung');
    bar.innerHTML =
      '<div class="oc-inner">' +
        '<p class="oc-text">Wir nutzen Cookies und Tools (u.a. Google, Microsoft Clarity), um unsere Website zu ' +
        'verbessern und den Erfolg unserer Werbung zu messen. Sie können frei entscheiden. Details in der ' +
        '<a href="/datenschutz.html">Datenschutzerklärung</a>.</p>' +
        '<div class="oc-btns">' +
          '<button type="button" class="oc-btn oc-reject">Ablehnen</button>' +
          '<button type="button" class="oc-btn oc-accept">Akzeptieren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('.oc-accept').addEventListener('click', function () { decide('granted'); });
    bar.querySelector('.oc-reject').addEventListener('click', function () { decide('denied'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
