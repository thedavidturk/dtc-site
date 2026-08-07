/**
 * FilmGrain -- a barely-there animated grain over the whole page.
 * Pure CSS: an SVG turbulence tile, stepped translation for the
 * flicker (styles in globals.css). Static under reduced motion.
 */
export default function FilmGrain() {
  return <div aria-hidden="true" className="film-grain" />;
}
