/* Meta Pixel – Garten & Landschaftsbau Osmani GmbH
   Pixel-ID: 1710425896806268
   Trackt: PageView (automatisch), Lead (WhatsApp-Klick, Formular-Submit, Telefon-Klick),
           ViewContent (KI-Vorschau / Anfrage-Seite). */
(function () {
  'use strict';

  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', '1710425896806268');
  fbq('track', 'PageView');

  // ViewContent auf hochintent-Seiten
  var path = (location.pathname || '').toLowerCase();
  if (path.indexOf('anfrage') !== -1 || path.indexOf('ki-vorschau') !== -1 || path.indexOf('kontakt') !== -1) {
    fbq('track', 'ViewContent', { content_name: path });
  }

  function trackLead(source) {
    try { fbq('track', 'Lead', { content_name: source }); } catch (e) {}
  }

  // Delegierter Klick-Listener für WhatsApp- und Tel-Links
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1 || href.indexOf('whatsapp://') !== -1) {
      trackLead('whatsapp_click');
    } else if (href.indexOf('tel:') === 0) {
      trackLead('phone_click');
    }
  }, true);

  // Formular-Submits = Lead
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.tagName !== 'FORM') return;
    trackLead('form_submit');
  }, true);
})();
