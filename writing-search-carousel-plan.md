# Writing Search & Carousel Plan

## Overview

Add two interactive features to the **Writing tab only**:

1. **Search bar** — a text input that filters the writing grid in real-time by matching against each article's title and teaser.
2. **Filmstrip carousel** — an alternative view mode toggled by a button below the search bar. Shows multiple article cards in a horizontal strip; the center card is full-size and highlighted, adjacent cards are smaller and dimmed. Left/right arrows advance the strip. Clicking any card opens the existing preview panel. The carousel operates on the currently filtered set.

No changes are made to the Projects tab.

---

## Sub-Tasks

---

### Sub-Task 1 — Writing search bar

**Intent**
Add a text input above the writing card grid that filters the displayed articles in real-time. Keeps the writing panel useful as articles continue to accumulate.

**Expected Outcomes**
- A search input is visible only when the Writing tab panel is active.
- Typing filters the writing grid immediately — only cards whose `title` or `teaser` contain the query (case-insensitive) are shown.
- Clearing the input restores all cards.
- An empty-state message is shown when no results match.
- The input is cleared and all cards restored whenever the user switches away from the Writing tab and back.

**Todo List**
1. Add a `<input type="search">` element inside `#panel-writing` in `index.html`, above `#grid-writing`.
2. Style the search input in `style.css` to match the existing design language (border `1.5px solid #d4d0c8`, border-radius `4px`, Caveat font, full-width within the panel).
3. In `main.js`, attach an `input` event listener to the search input that:
   - Reads the current query value.
   - Filters `portfolio.writing` to items where `title` or `teaser` includes the query (case-insensitive).
   - Calls `renderCards()` with the filtered array (or the full array if query is empty).
   - If the filtered array is empty, renders a "No articles match your search." message instead of an empty grid.
4. Clear the search input value and re-render all writing cards inside the existing `switchTab()` function when switching to a tab other than `writing`.

**Relevant Context**
- `index.html`: `#panel-writing` and `#grid-writing` are the insertion points.
- `main.js`: `renderCards(gridWriting, portfolio.writing, 'writing')` is the current render call. `switchTab()` handles tab switching.
- `style.css`: `.tab-bar`, `.tab`, `.card` show the design tokens to match.

**Status**: [x] done

---

### Sub-Task 2 — Filmstrip carousel view

**Intent**
Add a toggle button below the search bar that switches the Writing panel between the existing 2-column card grid and a filmstrip carousel. The carousel shows multiple cards horizontally; the center card is full-size and highlighted, surrounding cards are smaller and dimmed. Left/right arrow buttons advance the strip. Clicking any card opens the existing preview panel.

**Expected Outcomes**
- A "View as Carousel" button appears below the search bar in the Writing panel.
- Clicking it hides the grid and shows the carousel; the button label changes to "View as Grid".
- The carousel shows the currently filtered set of articles (from Sub-Task 1).
- The center card is visually prominent (full opacity, normal scale); cards to the left and right are scaled down and dimmed.
- Left (`‹`) and right (`›`) arrow buttons wrap-navigate through the articles.
- Clicking any card in the carousel opens `openPreview()` with that item, identical to the grid behavior.
- Switching tabs or performing a new search while in carousel mode resets the carousel to index 0 of the new result set.
- On mobile (≤640px), the carousel degrades gracefully — only the center card is shown (side cards are hidden).

**Todo List**
1. Add the toggle button (`id="writing-view-toggle"`) and carousel container (`id="carousel-writing"`) to `#panel-writing` in `index.html`, below the search input and above `#grid-writing`.
2. In `style.css`, add carousel layout styles:
   - `.carousel-writing`: `display: flex; align-items: center; overflow: hidden; position: relative;` with a fixed height.
   - `.carousel-track`: an inner flex row that will be transformed via `translateX`.
   - `.carousel-slide`: each card wrapper; transitions `transform` and `opacity`. Center slide: `transform: scale(1); opacity: 1`. Side slides: `transform: scale(0.82); opacity: 0.45`.
   - `.carousel-arrow`: left/right navigation buttons, styled to match existing button tokens (border, border-radius, Caveat font, hover uses `--secondary-color`).
3. In `main.js`:
   - Track a `writingViewMode` variable (`'grid'` | `'carousel'`) and a `carouselIndex` integer.
   - Add `renderCarousel(items)` function: builds `.carousel-slide` elements from `items`, appends them to the track, applies center/side CSS classes based on `carouselIndex`.
   - Add `advanceCarousel(direction)` function: increments/decrements `carouselIndex` with wrap-around, re-applies center/side classes and CSS transform to the track.
   - Attach click handlers on the toggle button to flip `writingViewMode`, show/hide `#grid-writing` vs `#carousel-writing`, update button label, and call the appropriate render function with the current filtered items.
   - Attach click handlers on carousel arrow buttons to call `advanceCarousel()`.
   - Attach click handler on each `.carousel-slide` card to call `openPreview()`.
   - When `renderCards()` for writing is called (e.g. on search), also re-render the carousel if `writingViewMode === 'carousel'`.
   - Reset `carouselIndex = 0` whenever the filtered item set changes (search or tab switch).

**Relevant Context**
- `main.js`: `openPreview(item, type)` is the function to call on card click. `renderCards()` is the existing grid renderer. The filtered-items array from Sub-Task 1's search logic is the source of truth for both views.
- `style.css`: `.card`, `.tab`, `.recent-work-link` show the design token pattern to follow for the arrow buttons and toggle button.
- `index.html`: `#panel-writing` is the container; `#grid-writing` is the existing grid target.

**Status**: [x] done

---

## Notes

- Both features are scoped to vanilla JS + CSS — no new dependencies.
- Sub-Task 1 must be completed before Sub-Task 2, since the carousel must consume the filtered items array established in Sub-Task 1.
- The existing `renderCards()` function should not be changed in signature — Sub-Task 2 adds a parallel `renderCarousel()` function.
