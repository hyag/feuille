/* ============================================================
   Feuille — 共通スクリプト
   ============================================================ */

// ---- ハンバーガーメニュー ----
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    menu.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Esc で閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); }
  });

  // リンクを押したら閉じる（同一ページ内リンク対策）
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { setOpen(false); }
  });

  // 画面を広げたときに開いた状態が残らないようにする
  window.addEventListener('resize', function () {
    if (window.innerWidth > 680) { setOpen(false); }
  });
})();

// ---- スクロールで順にフェードイン ----
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 非対応ブラウザ / モーション抑制時は最初から表示する
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (!entry.isIntersecting) return;
      setTimeout(function () { entry.target.classList.add('visible'); }, i * 90);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { io.observe(el); });
})();

// ---- 予約フォーム（デモ：送信はしない）----
(function () {
  var form = document.getElementById('reserve-form');
  var result = document.getElementById('form-result');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();   // 送信先が無いため実際には送らない
    if (result) {
      result.hidden = false;
      result.textContent = 'デモサイトのため送信されません。ご予約は hello.heroworks@gmail.com までお願いします。';
    }
  });
})();
