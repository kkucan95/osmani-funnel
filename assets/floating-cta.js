/* Floating CTA: WhatsApp + Call buttons – Garten & Landschaftsbau Osmani GmbH */
(function() {
  'use strict';

  // Don't add if already exists
  if (document.getElementById('osmani-floating-cta')) return;

  var WHATSAPP_NUMBER = '491791588576';
  var PHONE_NUMBER = '+491791588576';
  var WHATSAPP_PREFILL = 'Hallo Osmani Galabau, ich interessiere mich für ein Angebot.';

  var styles = '\
  #osmani-floating-cta { position: fixed; z-index: 9998; pointer-events: none; }\
  #osmani-floating-cta .osmani-fab { pointer-events: auto; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 4px 18px rgba(0,0,0,0.25); transition: transform 0.18s ease, box-shadow 0.18s ease; text-decoration: none; }\
  #osmani-floating-cta .osmani-fab:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.32); text-decoration: none; }\
  #osmani-floating-cta .osmani-fab:active { transform: translateY(0); }\
  #osmani-floating-cta .osmani-fab svg { display: block; }\
  /* Desktop / Tablet: WhatsApp + Phone bottom-right */\
  #osmani-floating-cta { right: 18px; bottom: 18px; display: flex; flex-direction: column; gap: 14px; }\
  #osmani-floating-cta .osmani-fab { width: 58px; height: 58px; }\
  #osmani-floating-cta .osmani-fab--wa { background: #25D366; }\
  #osmani-floating-cta .osmani-fab--call { background: #3a7d44; }\
  #osmani-floating-cta .osmani-fab svg { width: 30px; height: 30px; fill: #fff; }\
  /* Mobile: bottom-right, compact */\
  @media (max-width: 768px) {\
    #osmani-floating-cta { right: 12px; bottom: 14px; gap: 10px; }\
    #osmani-floating-cta .osmani-fab { width: 46px; height: 46px; }\
    #osmani-floating-cta .osmani-fab svg { width: 22px; height: 22px; }\
  }\
  /* Always visible – pointer events handled per-button */\
  #osmani-floating-cta .osmani-fab { pointer-events: auto; }\
  /* Subtle glow-pulse for WA (no expanding halo) */\
  @keyframes osmani-wa-glow { 0%, 100% { box-shadow: 0 4px 18px rgba(0,0,0,0.25); } 50% { box-shadow: 0 4px 22px rgba(37,211,102,0.65); } }\
  #osmani-floating-cta .osmani-fab--wa { animation: osmani-wa-glow 2.8s ease-in-out infinite; }\
  ';

  var styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  var container = document.createElement('div');
  container.id = 'osmani-floating-cta';
  container.setAttribute('role', 'complementary');
  container.setAttribute('aria-label', 'Schnellkontakt');

  // WhatsApp
  var waLink = document.createElement('a');
  waLink.className = 'osmani-fab osmani-fab--wa';
  waLink.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_PREFILL);
  waLink.target = '_blank';
  waLink.rel = 'noopener';
  waLink.setAttribute('aria-label', 'Per WhatsApp Kontakt aufnehmen');
  waLink.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.099-.471-.15-.67.15-.197.297-.767.964-.94 1.164-.173.2-.347.224-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.36-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  // Call
  var callLink = document.createElement('a');
  callLink.className = 'osmani-fab osmani-fab--call';
  callLink.href = 'tel:' + PHONE_NUMBER;
  callLink.setAttribute('aria-label', 'Anrufen ' + PHONE_NUMBER);
  callLink.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>';

  container.appendChild(waLink);
  container.appendChild(callLink);

  // Inject when body ready
  if (document.body) {
    document.body.appendChild(container);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(container);
    });
  }

  // ---- Telefon-Fallback: Wenn tel: blockiert ist (z.B. Facebook In-App-Browser),
  //      Nummer in Zwischenablage kopieren + Toast zeigen
  function showToast(text) {
    var toast = document.createElement('div');
    toast.textContent = text;
    toast.style.cssText = 'position:fixed;left:50%;bottom:80px;transform:translateX(-50%);' +
      'background:#1a1f24;color:#fff;padding:14px 20px;border-radius:10px;' +
      'box-shadow:0 8px 28px rgba(0,0,0,.35);z-index:99999;font-weight:600;' +
      'font-size:.95rem;max-width:90vw;text-align:center;opacity:0;' +
      'transition:opacity .25s ease;';
    document.body.appendChild(toast);
    requestAnimationFrame(function() { toast.style.opacity = '1'; });
    setTimeout(function() {
      toast.style.opacity = '0';
      setTimeout(function() { toast.remove(); }, 300);
    }, 4500);
  }

  // Detect Facebook/Instagram in-app browser
  var ua = navigator.userAgent || '';
  var isInAppBrowser = /FBAN|FBAV|FB_IAB|Instagram|Line\/|MicroMessenger|TikTok/i.test(ua);

  function attachPhoneFallback(link) {
    link.addEventListener('click', function(ev) {
      // Bei In-App-Browsern: Tel: oft blockiert → Nummer kopieren als Fallback
      if (isInAppBrowser) {
        ev.preventDefault();
        var number = '+49 179 1588576';
        var copy = function() {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(number);
          }
          // Legacy fallback
          var ta = document.createElement('textarea');
          ta.value = number;
          ta.style.position = 'fixed';
          ta.style.top = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e) {}
          ta.remove();
          return Promise.resolve();
        };
        copy().then(function() {
          showToast('📞 Telefonnummer kopiert: ' + number);
        }).catch(function() {
          showToast('📞 Bitte anrufen: ' + number);
        });
        return;
      }
      // Normale Browser: tel: funktioniert - aber Sicherheits-Nudge
      // setTimeout: nach 1.5s prüfen ob noch im DOM (= tel: ist nicht abgegangen)
      setTimeout(function() {
        if (document.visibilityState === 'visible' && document.hasFocus()) {
          // Browser ist immer noch sichtbar → tel: hat NICHT funktioniert
          showToast('📞 Telefon-App nicht verfügbar? Nummer: +49 179 1588576');
        }
      }, 1500);
    });
  }

  // Alle Telefon-Links auf der Seite + Floating-Call-Button absichern
  function wirePhoneLinks() {
    var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(attachPhoneFallback);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wirePhoneLinks);
  } else {
    wirePhoneLinks();
  }
})();
