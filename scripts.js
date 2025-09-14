import { podcasts, genres } from "./data.js";

// Create a template
const template = document.createElement("template");
template.innerHTML = `
  <style>
    .card {
      border: 1px solid #ddd;
      border-radius: 12px;
      overflow: hidden;
      max-width: 280px;
      font-family: sans-serif;
      background-color: black;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      margin: 10px;
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
      color: #555;
      margin: 0 0 0.5rem;
    }
    
    .text{
      font-size: 0.8rem;
      color: #777;
    }
  </style>
  <div class="card">
    <img id="img" src="" alt="">
    <div class="content">
      <h2 id="title"></h2>
      <p class="genre-text"><strong>Genres:</strong> <span id="genres"></span></p>
      <p class="text"><strong>Seasons:</strong> <span id="seasons"></span></p>
      <p class="text"><strong>Last Updated:</strong> <span id="updated"></span></p>
    </div>
  </div>
`;

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
            return genreIds
                .map((id) => {
                    const genre = genres.find((g) => g.id === id);
                    return genre ? genre.title : "";
                })
                .join(", ");
        } catch {
            return "Unknown";
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    render() {
        this.shadowRoot.getElementById("title").textContent =
            this.getAttribute("title") || "No title";
        this.shadowRoot.getElementById("img").src =
            this.getAttribute("image") || "";
        this.shadowRoot.getElementById("img").alt =
            this.getAttribute("title") || "Podcast image";
        this.shadowRoot.getElementById("genres").textContent = this.getGenreNames(
            this.getAttribute("genres") || "[]"
        );
        this.shadowRoot.getElementById("seasons").textContent =
            this.getAttribute("seasons") || "0";
        this.shadowRoot.getElementById("updated").textContent = this.getAttribute(
            "updated"
        )
            ? this.formatDate(this.getAttribute("updated"))
            : "Unknown";
    }
}

customElements.define("podcast-card", PodcastCard);

// Dynamically add all podcasts to the page
const container = document.getElementById("podcast-container");

podcasts.forEach((podcast) => {
    const card = document.createElement("podcast-card");
    card.setAttribute("title", podcast.title);
    card.setAttribute("image", podcast.image);
    card.setAttribute("genres", JSON.stringify(podcast.genres));
    card.setAttribute("seasons", podcast.seasons);
    card.setAttribute("updated", podcast.updated);
    container.appendChild(card);
});
