"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  /*
    Das seitliche Einfliegen parkt den Block 40 Pixel neben seinem Platz, bis
    er ins Bild scrollt. Auf dem Desktop verschwindet das in der zweispaltigen
    Breite. Auf dem Handy nicht: dort ist das Dokument dadurch 430 statt 390
    Pixel breit, und die Seite laesst sich ein paar Millimeter seitlich
    schieben. Genau dieses Wackeln.

    Unter 768 Pixel ist das Layout ohnehin einspaltig, ein Einfliegen von
    links oder rechts hat dort also auch gestalterisch keinen Sinn. Dort
    bleibt es beim Einfliegen von unten, das erzeugt keine Breite.

    Der Startwert ist bewusst false: der Server rendert die schmale Variante,
    damit schon der erste Frame ohne Ueberbreite ankommt.
  */
  const [seitlich, setSeitlich] = useState(false);

  useEffect(() => {
    if (direction === "up") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setSeitlich(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [direction]);

  const initial = seitlich
    ? { opacity: 0, x: direction === "left" ? -40 : 40 }
    : { opacity: 0, y: 40 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
