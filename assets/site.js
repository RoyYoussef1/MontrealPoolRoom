const t = (fr, en) => `<span class="fr">${fr}</span><span class="en">${en ?? fr}</span>`;
const price = n => n == null
  ? t('au comptoir', 'ask at counter')
  : t(n.toFixed(2).replace('.', ',') + ' $', '$' + n.toFixed(2));

const MENU = [
  { id:'hotdogs', fr:'Hot-dogs', en:'Hot dogs', items:[
    { fr:'Hot-dog steamé', en:'Steamed hot dog', p:3.89, fav:true,
      dfr:'Saucisse et pain cuits à la vapeur. Demandez-le all-dressed.', den:'Steamed frank in a soft steamed bun. Ask for it all-dressed.' },
    { fr:'Hot-dog toasté', en:'Toasted hot dog', p:4.49,
      dfr:'Saucisse grillée dans un pain toasté.', den:'Grilled frank in a toasted bun.' },
    { fr:'Hot-dog Michigan', en:'Michigan hot dog', p:5.29,
      dfr:'Nappé de sauce à la viande.', den:'Topped with meat sauce.' },
    { fr:'Pogo', en:'Pogo', p:5.29,
      dfr:'Saucisse en pâte de maïs, sur bâton.', den:'Corn-battered frank on a stick.' },
  ]},
  { id:'trios', fr:'Trios', en:'Trios',
    nfr:'Tous les trios incluent une boisson gazeuse en canette (355 ml).', nen:'Every trio includes a can of pop (355 ml).',
    items:[
    { num:1,  fr:'1 steamé, frites',        en:'1 steamie, fries',          p:12.29 },
    { num:2,  fr:'1 steamé, poutine',       en:'1 steamie, poutine',        p:17.99 },
    { num:3,  fr:'2 steamés, frites',       en:'2 steamies, fries',         p:15.99 },
    { num:4,  fr:'2 steamés, poutine',      en:'2 steamies, poutine',       p:21.49, fav:true },
    { num:5,  fr:'2 toastés, frites',       en:'2 toasted dogs, fries',     p:16.99 },
    { num:7,  fr:'Hamburger, poutine',      en:'Hamburger, poutine',        p:21.99 },
    { num:8,  fr:'Hamburger, frites',       en:'Hamburger, fries',          p:16.99 },
    { num:9,  fr:'Cheeseburger, poutine',   en:'Cheeseburger, poutine',     p:22.99 },
    { num:10, fr:'Cheeseburger, frites',    en:'Cheeseburger, fries',       p:18.99 },
    { num:11, fr:'Burger au poulet, poutine', en:'Chicken burger, poutine', p:21.99 },
  ]},
  { id:'poutines', fr:'Poutines', en:'Poutines', items:[
    { fr:'Poutine', en:'Poutine', p:12.29, fav:true,
      dfr:'Frites, fromage en grains, sauce brune.', den:'Fries, cheese curds, brown gravy.' },
    { fr:'Grande poutine', en:'Large poutine', p:17.99,
      dfr:'La même, en format à partager.', den:'Same thing, sized for sharing.' },
    { fr:'Poutine italienne', en:'Italian poutine', p:null,
      dfr:'Frites, fromage en grains, sauce à la viande.', den:'Fries, cheese curds, meat sauce.' },
    { fr:'Poutine hot-dog', en:'Hot dog poutine', p:null,
      dfr:'Notre poutine, garnie de saucisse.', den:'Our poutine, topped with sliced franks.' },
  ]},
  { id:'burgers', fr:'Hamburgers', en:'Burgers', items:[
    { fr:'Hamburger', en:'Hamburger', p:9.29,
      dfr:'Bœuf, laitue, tomate, pain au sésame.', den:'Beef patty, lettuce, tomato, sesame bun.' },
    { fr:'Cheeseburger', en:'Cheeseburger', p:10.99,
      dfr:'Bœuf, fromage, laitue, tomate, cornichons.', den:'Beef patty, cheese, lettuce, tomato, pickles.' },
    { fr:'Burger au poulet', en:'Chicken burger', p:9.99 },
  ]},
  { id:'sides', fr:'Frites et à-côtés', en:'Fries and sides', items:[
    { fr:'Frites', en:'Fries', p:5.59,
      dfr:'Coupées à la main, avec la pelure.', den:'Hand-cut, skin on.' },
    { fr:"Rondelles d'oignon", en:'Onion rings', p:5.99 },
  ]},
  { id:'drinks', fr:'Breuvages', en:'Drinks', items:[
    { fr:'Boisson gazeuse en canette (355 ml)', en:'Can of pop (355 ml)', p:null },
  ]},
];

const REVIEWS = [
  { name:'Doug W.',       stars:5, fr:'mai 2026',     en:'May 2026',     q:"If you don't eat here you REALLY have NOT visited Montreal." },
  { name:'Cole R.',       stars:5, fr:'janvier 2026', en:'January 2026', q:'Simple food done extremely well.' },
  { name:'Tori-Lynne G.', stars:5, fr:'mars 2026',    en:'March 2026',   q:'The gravy is super flavourful.' },
  { name:'Kris P.',       stars:5, fr:'mai 2026',     en:'May 2026',     q:'Perfectly cooked fries over savory brown gravy.' },
  { name:'Mohit G.',      stars:5, fr:'août 2026',    en:'August 2026',  q:'Try their all dressed Steamie.' },
];

if (document.getElementById('board')) {
  document.getElementById('chips').innerHTML =
    MENU.map(c => `<a href="#cat-${c.id}">${t(c.fr, c.en)}</a>`).join('');
  document.getElementById('board').innerHTML = MENU.map(c => `
    <section class="cat" id="cat-${c.id}">
      <h3>${t(c.fr, c.en)}</h3>
      ${c.nfr ? `<p class="note">${t(c.nfr, c.nen)}</p>` : ''}
      ${c.items.map(i => `
        <div class="item">
          <span class="n">${i.num ? `<span class="num">${i.num}</span>` : ''}${t(i.fr, i.en)}${i.fav ? `<span class="fav">${t('Le classique', 'House classic')}</span>` : ''}</span>
          <span class="dots" aria-hidden="true"></span>
          <span class="p">${price(i.p)}</span>
          ${i.dfr ? `<span class="d">${t(i.dfr, i.den)}</span>` : ''}
        </div>`).join('')}
    </section>`).join('');
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}
document.querySelectorAll('[data-price]').forEach(el => el.innerHTML = price(+el.dataset.price));

const rail = document.getElementById('rail');
if (rail) {
  rail.innerHTML = REVIEWS.map(r => `
    <article class="rev">
      <span class="starsrow" role="img" aria-label="${r.stars} / 5">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
      <blockquote>“${r.q}”</blockquote>
      <div class="who"><b>${r.name}</b><small>Google, ${t(r.fr, r.en)}</small></div>
    </article>`).join('');
  const step = () => rail.querySelector('.rev').offsetWidth + 28;
  document.getElementById('prev').onclick = () => rail.scrollBy({ left: -step(), behavior: 'smooth' });
  document.getElementById('next').onclick = () => rail.scrollBy({ left: step(), behavior: 'smooth' });
}

const HOURS = [
  { fr:'Dimanche', en:'Sunday' }, { fr:'Lundi', en:'Monday' }, { fr:'Mardi', en:'Tuesday' }, { fr:'Mercredi', en:'Wednesday' },
  { fr:'Jeudi', en:'Thursday' }, { fr:'Vendredi', en:'Friday' }, { fr:'Samedi', en:'Saturday' },
].map(d => ({ ...d, hfr:'10 h 30 – 4 h', hen:'10:30 AM – 4 AM' }));
function montrealNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone:'America/Toronto', weekday:'short', hour:'numeric', minute:'numeric', hour12:false }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday), mins: (+p.hour % 24) * 60 + +p.minute };
}
const hoursEl = document.getElementById('hours');
if (hoursEl) {
  const now = montrealNow();
  const today = now.mins < 240 ? (now.day + 6) % 7 : now.day;
  hoursEl.innerHTML = [1,2,3,4,5,6,0].map(i => `<li class="${i === today ? 'today' : ''}"><span>${t(HOURS[i].fr, HOURS[i].en)}</span><span>${t(HOURS[i].hfr, HOURS[i].hen)}</span></li>`).join('');
}

function setLang(l) {
  document.documentElement.lang = l;
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  document.querySelectorAll('img[data-alt-fr]').forEach(im => im.alt = im.dataset[l === 'fr' ? 'altFr' : 'altEn']);
  try { localStorage.setItem('mpr-lang', l); } catch (e) {}
  openStatus();
}
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.lang));

function openStatus() {
  const { mins } = montrealNow(), open = mins >= 630 || mins < 240;
  const fr = document.documentElement.lang === 'fr';
  document.querySelectorAll('.status').forEach(el => {
    el.classList.toggle('closed', !open);
    el.querySelector('.status-text').textContent = open
      ? (fr ? 'Ouvert en ce moment, jusqu\u2019à 4 h' : 'Open now, until 4 AM')
      : (fr ? 'Fermé, de retour à 10 h 30' : 'Closed, back at 10:30 AM');
  });
}
setInterval(openStatus, 60000);

let saved = null;
try { saved = localStorage.getItem('mpr-lang'); } catch (e) {}
setLang(saved === 'en' ? 'en' : 'fr');

const burger = document.querySelector('.burger'), nav = document.getElementById('nav');
burger.onclick = () => burger.setAttribute('aria-expanded', nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), fr = document.documentElement.lang === 'fr';
  const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}\n${f.get('phone') || ''}`;
  location.href = `mailto:mtlpoolroom1@gmail.com?subject=${encodeURIComponent('Message du site web / ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-note').textContent = fr
    ? 'Votre application de courriel s’ouvre avec le message prêt à envoyer.'
    : 'Your email app is opening with the message ready to send.';
});

document.getElementById('year').textContent = new Date().getFullYear();
const yearsOpen = document.getElementById('years-open');
if (yearsOpen) yearsOpen.textContent = new Date().getFullYear() - 1912;

const orderDialog = document.getElementById('order-dialog');
document.querySelectorAll('[data-order]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); orderDialog.showModal(); }));
orderDialog.addEventListener('click', e => { if (e.target === orderDialog || e.target.closest('.dlg-close')) orderDialog.close(); });
