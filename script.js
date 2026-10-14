// ====== CONFIGURAÇÃO: cole aqui os seus links ======
const LINKS = {
  basico: 'https://pay.wiapy.com/043I_qBrdB2g',// link do checkout da Oferta Básica (R$3,90)
  completo: 'https://pay.wiapy.com/xAXzndQS1TxM',// link do checkout da Oferta Completa (R$13,90)
  completoDesconto: 'https://pay.wiapy.com/vAcbl0gjpLL7',// link do checkout da Oferta Completa com desconto (R$9,90), usado no popup
  whatsapp: 'https://wa.me/5542988654609'
};

document.querySelectorAll('[data-checkout]').forEach(a => a.href = LINKS[a.dataset.checkout]);
document.querySelectorAll('[data-whatsapp]').forEach(a => a.href = LINKS.whatsapp);

// Popup: ao clicar no plano básico, oferece o completo com desconto antes de ir ao checkout
const upsell = document.getElementById('upsell');
document.querySelectorAll('[data-upsell]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  upsell.showModal();
}));
document.getElementById('upsell-close').onclick = () => upsell.close();
upsell.addEventListener('click', e => { if (e.target === upsell) upsell.close(); });

// Carrossel da prévia
const track = document.getElementById('track');
const counter = document.getElementById('counter');
const pages = [...track.children];
const total = pages.length;
let current = 0;

// As páginas anteriores à atual ficam viradas; a primeira fica no topo da pilha
const go = i => {
  current = (i + total) % total;
  pages.forEach((page, n) => {
    page.style.zIndex = total - n;
    page.classList.toggle('flipped', n < current);
  });
  counter.textContent = `Página ${current + 1} de ${total}`;
  // Troca automática: reinicia a contagem a cada mudança de página
  clearTimeout(timer);
  timer = setTimeout(() => go(current + 1), 2500);
};
let timer;
go(0);

document.getElementById('prev').onclick = () => go(current - 1);
document.getElementById('next').onclick = () => go(current + 1);

// Arrastar o dedo para virar a página no celular
let startX = null;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
track.addEventListener('touchend', e => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
  startX = null;
});
