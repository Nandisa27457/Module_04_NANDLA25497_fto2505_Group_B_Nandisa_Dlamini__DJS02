# DJS02 – Web Component: Podcast Preview

A sleek, modern web application for browsing and previewing podcasts with detailed season and episode information. A reusable and encapsulated **custom HTML element** that displays a podcast preview. The component must follow the **Web Component standard**, using `customElements.define()` and should work independently from the main application logic. This component will enhance modularity, promote reuse, and reduce code duplication across the app.

The component should be designed to **accept podcast data via attributes or properties**, display relevant UI elements (such as title, cover image, and genres), and **communicate with the main application** through custom events.


## Features

- Podcast Cards: Browse all available podcasts displayed as cards with cover image, title, genres, seasons, and last updated date.

- Responsive Design: Cards automatically adjust to screen size; stacked in a single column on mobile and side-by-side on larger screens.

Modal Preview: Click any podcast card to open a modal displaying:

- Podcast image

- Title

- Genres

- Number of seasons

-  List of seasons with episode counts

- Podcast description

- Close Modal: Easily close the modal using the close button or by clicking outside the modal area.

- Filter Options: Filter podcasts by genre and sort by recently updated, most popular, or newest.
## Usage/Examples

1. Open the App: Launch index.html in any modern web browser.

2. Browse Podcasts: Scroll through the podcast cards displayed on the main page.

3. View Details: Click a podcast card to open the modal and explore detailed season and episode information.

4. Close Modal: Click the “×” button or anywhere outside the modal to close it.

##Technical Details

Custom Elements: Each podcast card is a custom HTML element (<podcast-card>) using Shadow DOM.

Responsive Layout: Flexbox is used to create a responsive grid layout for podcast cards.

Data: Podcast, genre, and season data are imported from data.js.

Styling: Modern, dark-themed design with neon highlights for a sleek look.

```
Folder Structure
/images      # Podcast images and logo
/styles.css  # Global CSS
/scripts.js  # Main JavaScript file for cards and modal
/data.js     # Podcast, genres, and seasons data
index.html   # Main HTML page
```

