
(function() {
  function createTip() {
    const tip = document.createElement('div');
    tip.id = 'gloss-tip';
    tip.className = 'gloss-tip hidden bg-white border border-slate-300 rounded-xl shadow p-3 text-sm max-w-xs';
    document.body.appendChild(tip);
    return tip;
  }
  const tip = createTip();

  function showTip(html, x, y) {
    tip.innerHTML = html;
    tip.style.left = Math.max(8, x - tip.offsetWidth/2) + 'px';
    tip.style.top = (y + 14) + 'px';
    tip.classList.remove('hidden');
  }
  function hideTip() {
    tip.classList.add('hidden');
  }

  // click-to-gloss
  document.addEventListener('click', function(e) {
    const w = e.target.closest('s-w');
    if (w) {
      const id = w.getAttribute('w');
      const data = (window.MEANINGS && window.MEANINGS.words) ? window.MEANINGS.words[id] : null;
      if (data) {
        const pos = (data.t || []).join(', ');
        const gloss = data.en || '(no gloss)';
        const rect = w.getBoundingClientRect();
        const x = rect.left + rect.width/2 + window.scrollX;
        const y = rect.bottom + window.scrollY;
        const html = `<div class="font-semibold">${w.textContent.trim()}</div>
                      <div class="text-slate-700">${gloss}</div>
                      ${pos ? `<div class="text-slate-500 mt-1">${pos}</div>` : ''}`;
        showTip(html, x, y);
      } else {
        hideTip();
      }
      return;
    }
    // click outside closes
    if (!e.target.closest('#gloss-tip')) hideTip();
  });

  // font size controls (persist per page)
  function getStoryEl() {
    return document.querySelector('#story-text');
  }
  function setFS(step) {
    const key = 'storyFontScale';
    const current = Number(localStorage.getItem(key) || 0);
    const next = Math.max(-2, Math.min(6, current + step)); // clamp
    localStorage.setItem(key, String(next));
    applyFS();
  }
  function applyFS() {
    const el = getStoryEl();
    if (!el) return;
    const base = 1.125; // prose-lg base ~18px
    const scale = Number(localStorage.getItem('storyFontScale') || 0);
    el.style.fontSize = `calc(${base}rem + ${scale * 0.075}rem)`;
    el.style.lineHeight = 1.7;
  }
  document.addEventListener('DOMContentLoaded', function(){
    const inc = document.getElementById('inc-font');
    const dec = document.getElementById('dec-font');
    if (inc) inc.addEventListener('click', function(){ setFS(+1); });
    if (dec) dec.addEventListener('click', function(){ setFS(-1); });
    applyFS();

    // Keyboard: ESC closes tip
    document.addEventListener('keydown', function(ev){
      if (ev.key === 'Escape') hideTip();
    });
  });
})();
