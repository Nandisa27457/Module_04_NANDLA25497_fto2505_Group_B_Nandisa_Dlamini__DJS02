import { podcasts, genres, seasons } from "./data.js";

// ---- Podcast Card Template ----
const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
      display: block;
      width: 100%;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 12px;
      overflow: hidden;
      max-width: 280px;
      font-family: sans-serif;
      background-color: black;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      margin: 10px;
      cursor: pointer;
      color: #fff;
    }
    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
    }
    .content {
      padding: 1rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0 0 0.5rem;
    }
    p {
      font-size: 0.9rem;
      margin: 0 0 0.5rem;
      color: #aaa;
    }
  </style>
  <div class="card">
    <img id="img" src="" alt="">
    <div class="content">
      <h2 id="title"></h2>
      <p><strong>Genres:</strong> <span id="genres"></span></p>
      <p><strong>Seasons:</strong> <span id="seasons"></span></p>
      <p><strong>Last Updated:</strong> <span id="updated"></span></p>
    </div>
  </div>
`;

// ---- Podcast Card Class ----
class PodcastCard extends HTMLElement {
    static get observedAttributes() {
        return ["title", "image", "genres", "seasons", "updated"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback() {
        this.render();
    }

    getGenreNames(genreIdsString) {
        try {
            const genreIds = JSON.parse(genreIdsString);
            return genreIds.map(id => {
                const g = genres.find(genre => genre.id === id);
                return g ? g.title : "Unknown";
            }).join(", ");
        } catch {
            return "Unknown";
        }
    }

    formatDate(dateString) {
        if (!dateString) return "Unknown";
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    }

    render() {
        this.shadowRoot.getElementById("title").textContent = this.getAttribute("title") || "No title";
        this.shadowRoot.getElementById("img").src = this.getAttribute("image") || "";
        this.shadowRoot.getElementById("img").alt = this.getAttribute("title") || "Podcast image";
        this.shadowRoot.getElementById("genres").textContent = this.getGenreNames(this.getAttribute("genres") || "[]");
        this.shadowRoot.getElementById("seasons").textContent = this.getAttribute("seasons") || "0";
        this.shadowRoot.getElementById("updated").textContent = this.formatDate(this.getAttribute("updated"));
    }
}

customElements.define("podcast-card", PodcastCard);

// ---- Modal References ----
const modal = document.getElementById("podcast-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalGenres = document.getElementById("modal-genres");
const modalSeasons = document.getElementById("modal-seasons");
const modalEpisodes = document.getElementById("modal-episodes");
const modalDescription = document.getElementById("modal-description");

// ---- Utility Functions ----
function getGenreNames(genreIds) {
    return genreIds.map(id => {
        const g = genres.find(genre => genre.id === id);
        return g ? g.title : "Unknown";
    }).join(", ");
}

// ---- Open Modal ----
function openModal(podcast) {
    modalImg.src = podcast.image || "";
    modalTitle.textContent = podcast.title || "No Title";
    modalGenres.textContent = getGenreNames(podcast.genres || []);
    modalSeasons.textContent = podcast.seasons || "0";
    modalDescription.textContent = podcast.description || "No description available";

    // Clear old episodes
    modalEpisodes.innerHTML = "";

    // Look up seasons safely
    let podcastSeasons = null;
    if (podcast.id) {
        podcastSeasons = seasons.find(s => s.id === podcast.id);
    }

    if (podcastSeasons && podcastSeasons.seasonDetails.length) {
        podcastSeasons.seasonDetails.forEach(season => {
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.marginBottom = "8px";

            const leftDiv = document.createElement("div");
            const seasonTitle = document.createElement("strong");
            seasonTitle.textContent = season.title;
            const seasonSubtitle = document.createElement("div");
            seasonSubtitle.style.fontSize = "0.8rem";
            seasonSubtitle.style.color = "#777";
            seasonSubtitle.textContent = "Episodes:";
            leftDiv.appendChild(seasonTitle);
            leftDiv.appendChild(seasonSubtitle);

            const rightDiv = document.createElement("div");
            rightDiv.textContent = season.episodes;

            li.appendChild(leftDiv);
            li.appendChild(rightDiv);

            modalEpisodes.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No episodes available";
        modalEpisodes.appendChild(li);
    }

    modal.style.display = "flex";
}


// ---- Close Modal ----
closeModalBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

// ---- Add Podcast Cards ----
const container = document.getElementById("podcast-container");

podcasts.forEach(podcast => {
    const card = document.createElement("podcast-card");
    card.setAttribute("title", podcast.title);
    card.setAttribute("image", podcast.image);
    card.setAttribute("genres", JSON.stringify(podcast.genres));
    card.setAttribute("seasons", podcast.seasons);
    card.setAttribute("updated", podcast.updated);

    card.addEventListener("click", () => openModal(podcast));
    container.appendChild(card);
});
