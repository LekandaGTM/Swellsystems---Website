/**
 * Slug auf ausfuehrliche Fassung.
 *
 * Steht hier ein Eintrag, zeigt die Detailseite die lange Fassung. Steht keiner
 * da, zeigt sie den Hinweis, dass sie noch folgt. Vorher lag das in einem
 * eigenen Feld detailFertig in referenzen-daten.ts. Das war eine zweite Wahrheit
 * neben dieser Datei und konnte auseinanderlaufen: Flag auf true, Text nicht
 * geschrieben, Seite leer.
 */

import type { ComponentType } from "react";
import DoggyworldInhalt from "./doggyworld";

export const INHALTE: Record<string, ComponentType> = {
  doggyworld: DoggyworldInhalt,
};

export function inhaltFinden(slug: string): ComponentType | undefined {
  return INHALTE[slug];
}
