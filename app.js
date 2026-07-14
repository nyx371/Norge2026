const data = window.NORGE2026;
const byCategory = Object.fromEntries(data.categories.map((c) => [c.id, c]));
const $ = (selector) => document.querySelector(selector);

function mapsSearchUrl(name) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} Norge`)}`;
}

function placeCard(place, index) {
  const category = byCategory[place.category] ?? { label: "Stopp" };
  const rating = place.rating ? `<span>★ ${place.rating}${place.reviews ? ` · ${place.reviews} reviews` : ""}</span>` : "";
  const tips = place.tips?.length ? `<ul class="tips">${place.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>` : "";
  const visitLink = place.visitUrl ? `<a class="source-link" href="${place.visitUrl}" target="_blank" rel="noreferrer">Läs mer på Visit Helgeland →</a>` : "";
  return `
    <article class="card ${index < 6 ? "featured" : ""}" data-category="${place.category}">
      <a class="photo" href="${mapsSearchUrl(place.name)}" target="_blank" rel="noreferrer" aria-label="Öppna ${place.name} i Google Maps">
        <img src="${place.image}" alt="${place.name}" loading="lazy">
      </a>
      <div class="card-body">
        <div class="meta"><span>${category.label}</span>${rating}</div>
        <h3>${place.name}</h3>
        <p class="type">${place.type ?? "Resmål"}</p>
        <p>${place.note}</p>
        ${tips}
        <div class="card-links">
          ${visitLink}
          <a class="map-link" href="${mapsSearchUrl(place.name)}" target="_blank" rel="noreferrer">Öppna i Maps →</a>
        </div>
      </div>
    </article>`;
}

function categorySection(category) {
  const places = data.places.filter((place) => place.category === category.id);
  return `
    <section class="section" id="${category.id}">
      <div class="section-heading">
        <p class="eyebrow">${places.length} stopp</p>
        <h2>${category.label}</h2>
        <p>${category.note}</p>
      </div>
      <div class="grid">
        ${places.map(placeCard).join("")}
      </div>
    </section>`;
}

function init() {
  $("#mapListLink").href = data.mapListUrl;
  $("#placeCount").textContent = data.places.length;
  $("#categoryNav").innerHTML = data.categories.map((category) => `<a href="#${category.id}">${category.label}</a>`).join("");
  $("#sections").innerHTML = data.categories.map(categorySection).join("");
  $("#heroPhotos").innerHTML = data.heroImages.map((src, index) => `<img src="${src}" alt="Norge resebild ${index + 1}">`).join("");
}

init();
