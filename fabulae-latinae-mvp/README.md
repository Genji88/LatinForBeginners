# Fabulae Latinae — MVP

A tiny static site for Latin short stories with click-to-gloss vocabulary. No build required; just host these files (e.g., GitHub Pages, Netlify, or any static host).

## Structure
```
/index.html
/start-here/index.html
/library/index.html
/resources/index.html
/about/index.html
/stories/marcus/1/index.html   ← example story
/static/js/site.js             ← shared UI (gloss + font size)
/static/images/favicon.png
```

## Add a new story
1. Duplicate `/stories/marcus/1/index.html` into a new folder like `/stories/<slug>/<chapter>/index.html`.
2. Put your story text inside the `<section id="story-text">` area.
3. Wrap *clickable* tokens in `<s-w w="ID">word</s-w>` where `ID` is a key in your meanings object.
4. Update the in-page `window.MEANINGS` object to include `"words": { "ID": {"en": "...", "t": ["pos"] } }`.
5. Link your story from `/library/index.html`.

> Tip: You can also load meanings from an external JSON and set `window.MEANINGS` before `/static/js/site.js` runs.

## Hosting
- **GitHub Pages**: push the folder to a repo and enable Pages (root).  
- **Netlify**: drag-and-drop the folder to deploy.
- **Nginx/Apache**: serve as static files.

## Analytics (optional)
Add your script (e.g. Plausible) to pages where you want tracking.
