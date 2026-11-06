# Student Portfolio

A static, three-page personal portfolio for the SITE 1101 individual project. It includes a home introduction, an interactive learning journey, and cards for the portfolio, Hour of Code, and robotics projects.

## Run locally

Open `index.html` in a browser, or use VS Code's Live Server extension to preview the pages while editing.

## Project structure

```text
index.html          Home
about.html          Learning journey
projects.html       Project cards
css/style.css       Shared layout, responsive styles, and avatar animation
js/main.js          Navigation, image fallbacks, and journey scrolling
images/             Profile and project artwork
```

The About journey uses the mouse wheel or regular page scrolling to move its landscape sideways. The student avatar stays centered and walks while the milestones pass by.

## Personalize before publishing

- Replace `images/profile.jpg` with a portrait. If it is missing, the home page shows a photo prompt instead of a broken image.
- Replace `images/project1.png` with a project screenshot. The Hour of Code and robotics cards use the editable artwork in `images/project2.svg` and `images/project3.svg`.
- Update the first-person descriptions and course notes to match your own experience.
- The footer links to this repository: `M-Ismayilzada/Personal-Website-Project-4-SITE-1101`. Update that URL if you publish the site under a different repository.

This is a static site and does not require a build step or package installation.