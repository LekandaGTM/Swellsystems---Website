# Case Study: Doggyworld, Produktbilder-Automatisierung

**Stand:** 03. September 2026
**Status:** Konzept abgestimmt, noch nicht gebaut
**Ziel:** Erste echte Referenz auf swellsystems.ch, Geschäftsfeld Automatisierung

---

## Ausgangslage des Projekts

Erstes Testprojekt im Geschäftsfeld Automations, kostenlos gegen Referenz.
Kunde: Doggyworld, Marke Petlando, Schweizer Shopify-Shop. Ansprechpartner Paco.

Gebaut wurde kein n8n-Workflow, sondern eine eigene Anwendung: Next.js plus
Supabase, ausgeliefert als Paket, das Paco auf seinem Rechner startet.
Vollständiger technischer Stand im Repo `Swellsystem_Automations`, dort
`anwendung/produktbilder-tool/README.md` und
`supabase/produktbilder-tool/produktbilder-tool-supabase.md`.

**Freigabe:** Doggyworld darf namentlich genannt werden, mit Logo.
Logo liegt bereits vor: `Swellsystem_Automations/anwendung/produktbilder-tool/public/doggyworld-logo.png`,
1000 x 300 px, muss nach `ClaudeCode/public/` kopiert werden.

---

## Die Erzählstruktur der Seite

Fünf Abschnitte, in dieser Reihenfolge. So von Calvin vorgegeben.

### 1. Ausgangslage

Produktbilder entstanden bereits per KI, aber vollständig von Hand. Jedes Bild
einzeln geprompted, kein einheitlicher Prompt, also jedes Mal ein anderes
Ergebnis und oft mehrere Versuche, bis eines brauchbar war. Die Optimierung
frass die meiste Zeit.

Ein echtes Fotoshooting wäre um ein Vielfaches teurer gewesen und kam nie
in Frage.

Dazu liefen **zwei Abos für Bildgenerierung**, Monat für Monat, unabhängig
davon, ob in dem Monat überhaupt Bilder gebraucht wurden.

### 2. Analyse

Vor dem Bauen wurde festgelegt, was bisher in jedem Prompt neu erfunden wurde:
Wie sieht die Marke aus, welche Farben, welche fünf Bilder braucht ein Produkt
im Shop, was darf das Modell frei gestalten und was muss zwingend vom echten
Produkt kommen.

Die Faustregel daraus: Szene, Licht und Umgebung darf das Modell frei
gestalten. Was am Produkt selbst zu sehen ist, muss aus dem Rohbild stammen.

### 3. Lösung

Eine Automatisierung, die diese Entscheidungen ein für alle Mal festhält, plus
ein eigenes Interface, damit der Kunde sie selbst bedient.

Produktlink rein, Produktfoto rein, fünf fertige Bilder raus. Gefällt eines
nicht, genügt ein Satz: das bestehende Bild bleibt, nur das Genannte ändert
sich. Dateiname und Alt-Text kommen shopfertig mit.

### 4. Ergebnis

- 20 bis 30 Minuten gespart je Bild
- bei fünf Bildern je Produkt: ein bis zwei Stunden je Produkt
- fünf Bilder in rund drei Minuten
- rund einen halben Dollar je Produkt
- keine Abos mehr, die unabhängig von der Nutzung laufen

### 5. Beleg

Ein bis zwei echte Bilder. Am stärksten: Rohfoto neben erzeugtem Bild.
**Noch offen, siehe unten.**

---

## Belegte Zahlen

Alles gemessen, nichts geschätzt. Quellen im Automations-Repo.

| Aussage | Beleg |
|---|---|
| 5 fertige Shop-Bilder aus einem Link plus einem Foto | App-Ablauf, 5 Slots |
| rund 3 Minuten je Produkt (2 Min Prompts, 1 Min Bilder parallel) | README |
| 0.57 USD je Produkt, vorher 1.79 | gemessen, README und Memory |
| Masterprompt-Eingabe von 190'428 auf 10'934 Tokens | Tokentabelle v3 gegen v4 |
| Dateiname und Alt-Text kommen SEO-fertig mit | Prompt-Version 3 |
| Korrektur ändert das Bild, statt neu zu würfeln | Supabase-Doku, 0.8 % auf 14.9 % Wirkung |
| Harte Versuchsgrenze bei 3 | `einstellungen.max_versuche` |
| Alle Konten laufen auf den Kunden | Übergabepaket, Vault |

Rechenkontrolle zur Zeitersparnis: fünf Bilder mal 20 bis 30 Minuten sind
1:40 bis 2:30 Stunden. Die kommunizierte Spanne "ein bis zwei Stunden" ist also
bewusst konservativ. So bleibt sie.

---

## Formulierungsregeln für diese Seite

**Die Kostenaussage.** Nicht "keine laufenden Kosten", sondern:

> Vorher zwei Abos für Bildgenerierung, die jeden Monat liefen, ob Bilder
> gebraucht wurden oder nicht. Heute wird je erzeugtem Bild bezahlt.
> Kein Bild, keine Kosten.

Grund: ein Restsockel bleibt technisch bestehen. Supabase ist heute auf dem
Gratis-Plan, dessen Grenzen sind 1 GB Speicher (rund 100 bis 125 Produkte) und
eine Pause nach einer Woche ohne Zugriff. Wächst das Projekt darüber hinaus,
kommen rund 25 USD im Monat dazu. Die obige Formulierung stimmt in beiden
Fällen und ist trotzdem die starke Aussage. (Gegenmittel gegen die
Speichergrenze ist in Arbeit: eine automatische Aufräumroutine.)

**Keine Abo-Preise nennen**, solange die konkreten Beträge nicht bestätigt sind.

**Keine Gedankenstriche.** Punkt, Komma, Doppelpunkt oder Klammer stattdessen.
Gilt für die ganze Website.

**Kurze Unterzeilen.** Lieber knapp als erklärend.

**Ton:** nüchtern, keine Copywriter-Prosa, keine "X, nicht Y"-Pointen.

---

## Wo es auf der Website hinkommt

**Neue Seite `/case/produktbilder`.** Muster ist `app/[locale]/handwerk/page.tsx`:
hartcodiertes Deutsch, `AnimatedSection`, Wave-Divider, gleiche Farbwelt.
Nicht `saas-outbound`, die Seite läuft über `t()` und `messages/*.json`.

**Teaser auf der Startseite** im Abschnitt `beweis` (Zeile 825 in
`app/[locale]/page.tsx`). Dort steht heute nur der Kosten-Rechner, obwohl die
Navigation den Abschnitt "Referenzen" nennt. Der Teaser bringt Logo, drei
Zahlen und einen Link auf die Detailseite. Der Rechner bleibt darunter.

**Zu beachten:** In `messages/de.json` steht ein Block `caseStudies` mit drei
erfundenen Platzhaltern ("SaaS-Anbieter, Zürich, +280%"). Er läuft auf
`/saas-outbound`. Sobald eine echte, namentliche Referenz danebensteht, gehört
er ersetzt oder klar als anonymisiertes Projekt gekennzeichnet.

**Logo-Präzedenz:** `public/ecomone-logo.png` und `public/urtec-logo.webp`
werden auf `/saas-outbound` als Vertrauensleiste gezeigt. Doggyworld kommt
dazu.

---

## Offen

- **Die ein bis zwei Beispielbilder.** Entweder von Calvin geliefert oder aus
  dem Supabase-Bucket `produktbilder` geholt. Ideal: Rohfoto plus erzeugtes
  Bild nebeneinander
- **Englische Fassung.** Die Site ist zweisprachig, die Detailseite startet auf
  Deutsch
- **Statement von Paco.** Drei bis fünf Sätze mit Name und Funktion wären der
  stärkste Zusatz, laut Vereinbarungsvorlage Teil der Gegenleistung
- **Abnahmetest.** Zehn Produkte quer durchs Sortiment, bei acht alles ohne
  Nachbearbeitung veröffentlichungsfähig. Steht im Automations-Repo noch unter
  "Offen". Bis dahin keine Qualitätsquote auf der Seite behaupten
