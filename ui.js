// =============================================================
// script.js — Mon Dex
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.

// import { getcharacters} from "./src/services/API.js";

// let data=[]
//  data= await getcharacters()
// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.


let get_grid = document.getElementById("grid")

export function afficherCreatures(liste) {
  get_grid.innerHTML = "";

  liste.forEach(cart => {
     get_grid.insertAdjacentHTML('beforeend', `<article data-id="${cart.id}"
    class=" dex-card flex flex-col gap-3 rounded-card bg-white p-3 pb-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
    <div class=" character-zone relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
      <img
  src="${cart.image}"
  alt="${cart.name}"
  class="character-img">
    </div>
    <div class="flex items-center justify-between gap-2">
        <h3 class="font-display text-xl font-semibold">${cart.name}</h3>
        <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink">${cart.type}</span>
    </div>
    <p class="text-sm text-muted">${cart.level} · Total ${cart.stats.hp + cart.stats.attack + cart.stats.defence}</p>
    <button
        type="button"
  data-add="${cart.id}"
        class="btn-outline
        mt-auto
  focus-visible:outline-none
         focus-visible:ring-2
         focus-visible:ring-brand
         focus-visible:ring-offset-2
         disabled:opacity-50
         disabled:cursor-not-allowed">

        Ajouter à l'équipe

    </button>
</article>`)

});
actualiserBoutonsEquipe();
}






// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------

const recherche = document.getElementById("search");
const filtres = document.getElementById("filters");

let types = ["Tous"];
let typeActif = "Tous";

// const types = [
//   "Tous",
//   ...new Set(creatures.map(personnage => personnage.type))
// ];
let creatures =[]
export function setcreatures(liste){
  creatures = liste;
  types = ["Tous",...new Set(liste.map(c=> c.type))];
  afficherFiltres();
}

function afficherFiltres() {
  filtres.innerHTML = types.map(type => `
    <button
      type="button"
      class="chip"
      data-type="${type}"
      aria-pressed="${type === typeActif}"
    >
      ${type}
    </button>
  `).join("");
}

function appliquerFiltres() {
  const texte = recherche.value.trim().toLowerCase();

  const resultats = creatures.filter(personnage => {
    const correspondNom =
      personnage.name.toLowerCase().includes(texte);

    const correspondType =
      typeActif === "Tous" || personnage.type === typeActif;

    return correspondNom && correspondType;
  });

  afficherCreatures(resultats);
}

recherche.addEventListener("input", appliquerFiltres);

filtres.addEventListener("click", event => {
  const bouton = event.target.closest("button[data-type]");
  if (!bouton) return;

  typeActif = bouton.dataset.type;
  afficherFiltres();
  appliquerFiltres();
});





// -------------------------------------------------------------


// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------


const detail = document.getElementById("detail");
detail.hidden = true;

export function afficherDetail(personnage) {
  detail.hidden = false;

  const statistiques = [
    ["PV", personnage.stats.hp],
    ["Attaque", personnage.stats.attack],
    ["Diffense", personnage.stats.defence]
  ];

  detail.innerHTML = `
    <div class="flex items-center justify-between">
      <span class="font-mono text-sm text-muted">
        ${personnage.id} · Detail
      </span>
      <button
        type="button"
        data-close
        aria-label="Fermer le detail"
        class="btn-outline"
      >✕</button>
    </div>

    <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
      <img
        src="${personnage.image}"
        alt="${personnage.name}"
        class="h-full w-full object-contain"
      >
    </div>

    <h2 class="font-display text-3xl font-extrabold">
      ${personnage.name}
    </h2>

    <p class="font-bold">${personnage.type} · ${personnage.level}</p>
    <p>${personnage.description}</p>

    <div class="flex flex-col gap-3">
      ${statistiques.map(([nom, valeur]) => `
        <div>
          <div class="flex justify-between text-sm">
            <span>${nom}</span>
            <span>${valeur}</span>
          </div>
          <div class="h-3 rounded-full bg-ground">
            <div
              class="h-3 rounded-full bg-brand"
          style="width: ${Math.min(valeur / 5000 * 100, 100)}%"
            ></div>
          </div>
        </div>
      `).join("")}
    </div>
  <button
      type="button"
      class="btn-primary"
      data-add="${personnage.id}"
    >
      Ajouter à l'équipe
    </button>
  `;
  actualiserBoutonsEquipe();
}

export function show(){get_grid.addEventListener("click", (event) => {
 
 const bouton = event.target.closest("[data-add]");

if (bouton) {
  ajouterEquipe(bouton.dataset.add);
  return;
}

  const carte = event.target.closest("article[data-id]");
  if (!carte) return;

  const personnage = creatures.find(
    personnage => String(personnage.id) === carte.dataset.id
  );

  if (personnage) {
    afficherDetail(personnage);
  }
});}
 

detail.addEventListener("click", event => {
  if (event.target.closest("[data-close]")) {
    detail.hidden = true;
  }

  const bouton = event.target.closest("[data-add]");

  if (bouton) {
    ajouterEquipe(bouton.dataset.add);
  }
});









// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------




// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------




const formulaire = document.getElementById("creature-form");

const regles = {
  id: /^#\d{3}$/,
  name: /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,
  level: /^[\s\S]{2,30}$/,
  stat1: /^\d{1,3}$/,
  stat2: /^\d{1,3}$/,
  stat3: /^\d{1,3}$/,
  image: /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,
  description: /^[\s\S]{10,200}$/
};

const messages = {
  id: "Format attendu : #017, avec un numero unique.",
  name: "2 a 30 caracteres : lettres, chiffres, espaces, point, apostrophe ou tiret.",
  type: "Choisissez un type.",
  level: "Indiquez un niveau de 2 a 30 caracteres.",
  stat1: "Entrez un entier entre 0 et 999.",
  stat2: "Entrez un entier entre 0 et 999.",
  stat3: "Entrez un entier entre 0 et 999.",
  image: "Lien https terminant par .png, .jpg, .jpeg, .webp ou .gif.",
  description: "La description doit contenir 10 a 200 caracteres."
};

const champs = Array.from(
  formulaire.querySelectorAll("input, select, textarea")
);

function validerChamp(champ) {
  const valeur = champ.value.trim();
  let valide;

  if (champ.name === "type") {
    valide = types.includes(valeur) && valeur !== "Tous";
  } else {
    valide = regles[champ.name].test(valeur);
  }

  if (champ.name === "id" && valide) {
    valide = !creatures.some(personnage => personnage.id === valeur);
  }

  champ.setAttribute("aria-invalid", String(!valide));

  const erreur = champ.parentElement.querySelector(".error-message");
  erreur.textContent = valide ? "" : messages[champ.name];

  return valide;
}

champs.forEach(champ => {
  champ.addEventListener("blur", () => {
    validerChamp(champ);
  });
});

formulaire.addEventListener("submit", event => {
  event.preventDefault();

  const resultats = champs.map(champ => validerChamp(champ));
  if (!resultats.every(Boolean)) return;

  const valeurs = new FormData(formulaire);

  const personnage = {
    id: valeurs.get("id").trim(),
    name: valeurs.get("name").trim(),
    type: valeurs.get("type"),
    level: valeurs.get("level").trim(),
    stats: {
      hp: Number(valeurs.get("stat1")),
      attack: Number(valeurs.get("stat2")),
      defence: Number(valeurs.get("stat3"))
    },
    image: valeurs.get("image").trim(),
    description: valeurs.get("description").trim()
  };

  creatures.push(personnage);

  recherche.value = "";
  typeActif = "Tous";
  afficherFiltres();
  appliquerFiltres();

  document.getElementById("creature-count").textContent =
    creatures.length;

  formulaire.reset();
  afficherDetail(personnage);
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
});

formulaire.addEventListener("reset", () => {
  champs.forEach(champ => {
    champ.removeAttribute("aria-invalid");
    champ.parentElement.querySelector(".error-message").textContent = "";
  });
});

// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------
let equipe = [];

const listeEquipe = document.getElementById("team-list");
const messageEquipe = document.getElementById("team-message");

function actualiserBoutonsEquipe() {
  document.querySelectorAll("[data-add]").forEach(bouton => {
    bouton.disabled = equipe.length >= 6;
  });
}

function afficherEquipe() {
  listeEquipe.innerHTML = equipe.map(personnage => `
    <div class="flex flex-col items-center gap-2 rounded-xl border-2 border-line p-2">
      <img
        src="${personnage.image}"
        alt="${personnage.name}"
        class="h-20 w-full object-contain"
      >
      <p class="text-center text-sm font-bold">
        ${personnage.name}
      </p>
      <button
        type="button"
        data-remove="${personnage.id}"
        class="btn-outline mt-auto"
      >
        Retirer
      </button>
    </div>
  `).join("");

  for (let i = equipe.length; i < 6; i++) {
    listeEquipe.insertAdjacentHTML("beforeend", `
      <div class="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-line">
        +
      </div>
    `);
  }

  document.getElementById("team-count").textContent = equipe.length;
  document.getElementById("team-count-display").textContent = equipe.length;

  actualiserBoutonsEquipe();
}

function ajouterEquipe(id) {
  if (equipe.some(personnage => String(personnage.id) === id)) {
    messageEquipe.textContent = "Ce personnage est deja dans l'equipe.";
    return;
  }

  if (equipe.length >= 6) {
    messageEquipe.textContent = "Equipe complete : maximum 6 personnages.";
    return;
  }

  const personnage = creatures.find(personnage => String(personnage.id )=== id);
  if (!personnage) return;

  equipe.push(personnage);
  afficherEquipe();

  messageEquipe.textContent = equipe.length === 6
    ? "Equipe complete : 6/6. Retirez un personnage pour en ajouter un autre."
    : `${personnage.name} a rejoint l'equipe.`;
}

listeEquipe.addEventListener("click", event => {
  const bouton = event.target.closest("[data-remove]");
  if (!bouton) return;

  equipe = equipe.filter(
    personnage => String(personnage.id) !== bouton.dataset.remove
  );

  afficherEquipe();
  messageEquipe.textContent = "Personnage retire de l'equipe.";
});

afficherEquipe();


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -----------------------------------------------------------  




