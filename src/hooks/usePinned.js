import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* Las secciones fijadas con scroll solo corren en escritorio y sin
   "reducir movimiento". Debe coincidir con el media query del CSS. */
export function usePinned() {
  const desktop = useMediaQuery("(min-width: 900px)");
  const reduce = useReducedMotion();
  return desktop && !reduce;
}

/* Variante de la coreografía de scroll:
   "desktop" (secciones fijadas completas), "mobile" (versión táctil ligera)
   o "static" cuando el usuario pide reducir movimiento. */
export function useMotionMode() {
  const desktop = useMediaQuery("(min-width: 900px)");
  const reduce = useReducedMotion();
  if (reduce) return "static";
  return desktop ? "desktop" : "mobile";
}

export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
