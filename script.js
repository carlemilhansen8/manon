/* MANON – funktioner */
const menu = {
  cocktails: [
    ['Fremhævet drink 1', 'Gin · bitter · vermouth'],
    ['Fremhævet drink 2', 'Vodka · espresso · kaffelikør'],
    ['Fremhævet drink 3', 'Gin · citron · bobler'],
    ['Fremhævet drink 4', 'Tequila · grapefrugt · lime']
  ],
  vin: [
    ['Fremhævet vin 1', 'Spørg efter dagens udvalg'],
    ['Fremhævet vin 2', 'Frisk, mineralsk eller fyldig'],
    ['Fremhævet vin 3', 'Et glas til de lyse timer'],
    ['Fremhævet vin 4', 'Fra let og elegant til dyb og intens']
  ],
  andet: [
    ['Alkoholfri cocktails', 'Spørg efter mulighederne'],
    ['Øl', 'Udvalg oplyses i baren'],
    ['Sodavand', 'Kolde klassikere'],
    ['Vand', 'Med eller uden brus']
  ]
};
function visMenu(kategori) {
  const liste = document.getElementById('menu-items');
  liste.replaceChildren();
  menu[kategori].forEach(([navn, beskrivelse]) => {
    const element = document.createElement('article');
    element.className = 'menu-item';
    const overskrift = document.createElement('h3');
    overskrift.textContent = navn;
    const tekst = document.createElement('p');
    tekst.textContent = beskrivelse;
    element.append(overskrift, tekst);
    liste.append(element);
  });
  document.querySelectorAll('.tab').forEach(knap => {
    const aktiv = knap.dataset.tab === kategori;
    knap.classList.toggle('active', aktiv);
    knap.setAttribute('aria-selected', String(aktiv));
  });
}
visMenu('cocktails');
document.querySelectorAll('.tab').forEach(knap => {
  knap.addEventListener('click', () => visMenu(knap.dataset.tab));
});
const menuKnap = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
menuKnap.addEventListener('click', () => {
  const aaben = navigation.classList.toggle('open');
  menuKnap.setAttribute('aria-expanded', String(aaben));
  menuKnap.textContent = aaben ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuKnap.setAttribute('aria-expanded', 'false');
    menuKnap.textContent = '☰';
  });
});
if ('IntersectionObserver' in window) {
  const observatoer = new IntersectionObserver(poster => {
    poster.forEach(post => {
      if (post.isIntersecting) {
        post.target.classList.add('visible');
        observatoer.unobserve(post.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(element => observatoer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
document.getElementById('year').textContent = new Date().getFullYear();
const iDag = new Date();
const lokalDato = [iDag.getFullYear(), String(iDag.getMonth() + 1).padStart(2, '0'), String(iDag.getDate()).padStart(2, '0')].join('-');
document.getElementById('date').min = lokalDato;
