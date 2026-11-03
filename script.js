/* ======================================================
   MANON – FUNKTIONER
   Rediger menukortet og bookingmailen nedenfor.
   ====================================================== */

// 1. MENUKORT – rediger navn og beskrivelse for hver drik.
//    Menukortet er kun et eksempel, indtil I indsætter det rigtige.
const menu = {
  cocktails: [
    ['Drink 1', 'Gin · bitter · vermouth'],
    ['Drink 2', 'Vodka · espresso · kaffelikør'],
    ['Drink 3', 'Gin · citron · bobler'],
    ['Drink 4', 'Tequila · grapefrugt · lime']
  ],
  vin: [
    ['Vin 1', 'Spørg efter dagens udvalg'],
    ['Vin 2', 'Frisk, mineralsk eller fyldig'],
    ['Vin 3', 'Et glas til de lyse timer'],
    ['Vin 4', 'Fra let og elegant til dyb og intens']
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

// 2. MOBILMENU – åbner og lukker navigationen på små skærme.
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

// 3. ANIMATION – elementerne kommer blidt frem, når man scroller.
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

// 4. DATO OG ÅRSTAL – opdateres automatisk.
document.getElementById('year').textContent = new Date().getFullYear();
const iDag = new Date();
const lokalDato = [iDag.getFullYear(), String(iDag.getMonth() + 1).padStart(2, '0'), String(iDag.getDate()).padStart(2, '0')].join('-');
document.getElementById('date').min = lokalDato;

// 5. BOOKING – indsæt Manons rigtige e-mailadresse mellem anførselstegnene.
// Eksempel: const bookingEmail = 'booking@ditdomaene.dk';
// Dette er en e-mailforespørgsel, IKKE et egentligt bookingsystem.
const bookingEmail = '';

document.getElementById('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const felt = id => document.getElementById(id).value;
  const emne = 'Bordforespørgsel Manon – ' + felt('date');
  const besked = [
    'Navn: ' + felt('name'),
    'E-mail: ' + felt('email'),
    'Dato: ' + felt('date'),
    'Tid: ' + felt('time'),
    'Gæster: ' + felt('guests'),
    'Besked: ' + felt('message'),
    '',
    'Dette er en forespørgsel, ikke en bekræftet reservation.'
  ].join('\n');

  if (!bookingEmail) {
    document.getElementById('form-status').textContent =
      'Manons booking-e-mail mangler. Kontakt baren via Instagram, indtil adressen er sat op.';
    return;
  }

  window.location.href = 'mailto:' + bookingEmail +
    '?subject=' + encodeURIComponent(emne) +
    '&body=' + encodeURIComponent(besked);
  document.getElementById('form-status').textContent =
    'Dit mailprogram åbnes nu. Reservationen gælder først, når Manon har bekræftet den.';
});
