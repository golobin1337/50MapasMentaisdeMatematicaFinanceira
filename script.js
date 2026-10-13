// ====== CONFIGURAÇÃO: cole aqui os seus links ======
const LINKS = {
  basico: '#',     // link do checkout da Oferta Básica (R$3,90)
  completo: '#',   // link do checkout da Oferta Completa (R$13,90)
  whatsapp: '#'    // ex.: https://wa.me/5511999999999
};

document.querySelectorAll('[data-checkout]').forEach(a => a.href = LINKS[a.dataset.checkout]);
document.querySelectorAll('[data-whatsapp]').forEach(a => a.href = LINKS.whatsapp);

// Carrossel da prévia
const track = document.getElementById('track');
const counter = document.getElementById('counter');
const total = track.children.length;
const current = () => Math.round(track.scrollLeft / track.clientWidth);
const go = i => track.scrollTo({ left: ((i + total) % total) * track.clientWidth, behavior: 'smooth' });
document.getElementById('prev').onclick = () => go(current() - 1);
document.getElementById('next').onclick = () => go(current() + 1);
track.addEventListener('scroll', () => counter.textContent = `Página ${current() + 1} de ${total}`);
