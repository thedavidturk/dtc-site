/**
 * Drop-in replacement for next/link that animates client-side navigation
 * via the View Transitions API (next-view-transitions).
 *
 * Accepts the exact same props as next/link. In browsers without
 * document.startViewTransition it behaves identically to next/link
 * (instant navigation, no broken states).
 *
 * Usage: `import Link from "@/components/TransitionLink";`
 */
export { Link as default } from "next-view-transitions";
