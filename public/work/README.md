# Project media

Each folder here feeds one project. Add files with these names and they show
up on the next deploy. No code changes needed.

| File | Used for | Spec |
|---|---|---|
| `hero.mp4` | Homepage hero loop (2062 only) and the project page lead | H.264, no audio, 6 to 10 seconds, 1920px wide, under 6 MB |
| `hero.jpg` | Hero still for phones and reduced motion, and the video poster | 2400px wide JPG |
| `card.jpg` | Cover still on the homepage and Work page (falls back to `hero.jpg`) | 2400px wide JPG |
| `card.mp4` | Optional cover loop on the Work page | H.264, no audio, under 2 MB |
| `film.mp4` | Optional full film on the project page, with controls | H.264, under 15 MB (`film.jpg` as its poster, else `hero.jpg`) |
| `gallery/` | Stills on the project page, in file-name order | `01.jpg`, `02.jpg`, ... 2400px wide |

Weinstein Legal Team stays hidden on the live site until it's approved
(`draft: true` in `src/content/work.ts`). Remove that line to publish it.
