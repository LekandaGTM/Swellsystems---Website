# Offer Generator Skill — LeadLab GmbH

## Trigger

Use this skill when the user says `/offer`, "create an offer", "schreib eine Offerte", or provides client + project + pricing context and wants a formatted offer document.

---

## Role

You are generating a professional Swiss-compliant offer (Offerte) on behalf of **LeadLab GmbH**. Output is a `.docx` file with exact formatting — no manual spacing adjustments needed.

---

## Step 1: Collect Missing Information

Before generating, check which of the following are provided. Ask for anything missing in a single message:

| Variable | Description | Example |
|----------|-------------|---------|
| `language` | DE or EN | "German" |
| `client_name` | Full company name | "AutomateDemand" |
| `client_contact` | Full name of contact person | "David Kwint" |
| `client_address` | Street, postal code, city, country | "Kronprinzstrasse 10, 40217 Düsseldorf, Deutschland" |
| `client_country` | Country of client (determines VAT logic) | "Deutschland" |
| `project_name` | Name of the project or engagement | "heycare GTM" |
| `service_description` | What is being delivered | "Setup, Beratung und operative Umsetzung..." |
| `base_fee` | Fixed fee amount + currency | "800.00 CHF" |
| `commission` | Optional — percentage + basis | "10% auf Netto-Kundenumsatz" |
| `offer_number` | Sequential 3-digit number (ask user to confirm) | "005" |
| `offer_date` | Today's date | auto: use today |
| `valid_until` | Default: offer date + 14 days | auto-calculate |

If language is not specified, ask: "Soll die Offerte auf Deutsch oder Englisch sein?"

---

## Step 2: Determine VAT Treatment

Use client country to select the correct legal text:

### Client in Germany (or other EU member state) — B2B
- Table row: `Mehrwertsteuer (0% Export / Reverse Charge)*` → `0.00 CHF`
- Footnote: `*Steuerbefreite Dienstleistung gemäss Art. 8 Abs. 1 MWSTG (Empfängerortsprinzip). Die Umsatzsteuerschuld geht im Rahmen des Reverse-Charge-Verfahrens auf den Leistungsempfänger über.`

### Client in Switzerland — B2B
- Table row: `Mehrwertsteuer (8.1% MWST)` → `[8.1% of base_fee] CHF`
- Only apply if VAT-registered. If not: `0.00 CHF` + note `nicht MWST-pflichtig (Umsatz unter Freigrenze)`

### Client outside EU/CH (e.g. USA, UK)
- Table row: `Mehrwertsteuer (0% Export)*` → `0.00 CHF`
- Footnote: `*Exportleistung gemäss Art. 8 Abs. 1 MWSTG. Keine Schweizer Mehrwertsteuer anwendbar.`

---

## Step 3: Generate the .docx File

Use the `docx` skill to generate a properly formatted Word document.

### File Naming Convention
```
Offerte_[ClientName]_[OfferNumber]_[Price]
```
Examples:
- `Offerte_AutomateDemand_004_800CHF.docx`
- `Offerte_Bliro_005_1200CHF.docx`
- `Offerte_SwissClient_006_2000CHF.docx`

For prices with commission only (no base fee): use `Variabel`. For mixed: use the base fee amount.

### Save Location
Save to `~/Documents/Buchhaltung CIS Group GmbH/[YYYY]/Q[quarter]/` where quarter is determined by offer date:
- Jan–Mar → Q1, Apr–Jun → Q2, Jul–Sep → Q3, Oct–Dec → Q4

Example: offer dated 23.03.2026 → `~/Documents/Buchhaltung CIS Group GmbH/2026/Q1/`

Do NOT create subfolders — save directly into the quarter folder.

### Document Formatting Spec

Apply these styles consistently:

**Page:** A4, margins 2.5cm all sides
**Font:** Calibri throughout
**Paragraph spacing:** 0pt before, 4pt after (no extra spacing between lines)
**Line spacing:** Single (1.0)

| Element | Style |
|---------|-------|
| "OFFERTE" / "QUOTATION" | Bold, 18pt, no spacing after |
| Section labels (Absender, Empfänger etc.) | Bold, 10pt |
| Body text | Regular, 10pt |
| Table header row | Bold, 10pt, light grey background (#F2F2F2) |
| Table body rows | Regular, 10pt, no extra row padding |
| Footer | Regular, 8pt, grey (#666666) |
| Footnote | Italic, 8pt |

**Tables:** No cell padding beyond 2pt top/bottom. Borders: thin (0.5pt), grey.

---

### GERMAN DOCUMENT STRUCTURE

**[Header block — no table, plain text lines]**
```
OFFERTE

Absender: LeadLab GmbH, Espenmoosstrasse 6, 9008 St. Gallen | UID: CHE-344.886.977
Empfänger: [client_name], [client_contact], [client_address]
Datum: [offer_date] | Offert-Nr.: [offer_number] | Gültig bis: [valid_until]
```
*(4pt spacing between lines, no blank paragraphs)*

**[Intro]**
```
Offerte: [project_name]

Sehr geehrter Herr / Sehr geehrte Frau [last_name],

Vielen Dank für das angenehme Gespräch. Basierend auf Ihren Anforderungen unterbreite ich Ihnen gerne folgende Offerte für [short project description].
```

**[Positions Table — 5 columns]**

| Pos. | Beschreibung | Menge | Einzelpreis | Gesamt |
|------|-------------|-------|------------|--------|
| 1 | [Service Title] – [one-line description] | 1 | [base_fee] | [base_fee] |
| 2 (if commission) | Erfolgsbasierte Umsatzbeteiligung – [X]% auf Netto-Kundenumsatz, monatl. Abrechnung, Reporting bis 5. des Folgemonats | – | [X]% | Variabel |
| (empty) | Mehrwertsteuer (0% Export / Reverse Charge)* | | | 0.00 CHF |
| (bold) | **TOTAL (Basisbetrag)**, zuzüglich Provision Pos. 2 | | | **[base_fee]** |

**[Payment Terms Table — 2 columns]**

Heading: **Zahlungsbedingungen & Abrechnung** (bold, 11pt, 8pt above)

| Bezeichnung | Detail |
|-------------|--------|
| Basisvergütung | [base_fee], zahlbar innerhalb von 10 Arbeitstagen nach Rechnungsstellung (netto). |
| Provisionsabrechnung (if commission) | [X]% des Netto-Kundenumsatzes, monatlich nachträglich. [client_name] liefert Umsatzübersicht bis zum 5. des Folgemonats. Abrechnung in [CHF/EUR] zum Tageskurs. |
| Bankspesen | Allfällige Spesen für grenzüberschreitende Zahlungen gehen zu Lasten des Auftraggebers. |
| Gültigkeit | Diese Offerte ist gültig bis [valid_until]. |

**[Footnote]**
```
*Steuerbefreite Dienstleistung gemäss Art. 8 Abs. 1 MWSTG (Empfängerortsprinzip). Die Umsatzsteuerschuld geht im Rahmen des Reverse-Charge-Verfahrens auf den Leistungsempfänger ([client_name]) in [client_country] über.
```
*(8pt italic)*

**[Closing]**
```
Bei Fragen stehe ich Ihnen gerne zur Verfügung. Ich freue mich auf die Zusammenarbeit!

Freundliche Grüsse
Calvin Heim – Founder, LeadLab GmbH
```

**[Footer — page bottom, 8pt grey, separated by thin line]**
```
LeadLab GmbH | Espenmoosstrasse 6, 9008 St. Gallen | calvin@heimdigital.ch | 079 649 52 98 | www.heimdigital.ch
Bank: Raiffeisen | IBAN: CH47 8080 8001 2242 9436 1 | UID: CHE-344.886.977
```

---

### ENGLISH DOCUMENT STRUCTURE

Same layout as German. Replace labels:
- OFFERTE → QUOTATION
- Absender/Empfänger → From/To
- Datum/Offert-Nr./Gültig bis → Date/Quote No./Valid Until
- Sehr geehrte/r → Dear
- Freundliche Grüsse → Kind regards
- Zahlungsbedingungen → Payment Terms
- Basisvergütung → Base Fee
- Provisionsabrechnung → Commission Invoicing
- Bankspesen → Bank Fees
- Gültigkeit → Validity

Footnote EN: `*Service exempt from Swiss VAT per Art. 8 Para. 1 Swiss VAT Act (place of supply principle). VAT liability transferred to recipient ([client_name]) under reverse-charge.`

---

## Step 4: Quality Checklist (run before saving file)

- [ ] Filename follows `Offerte_[Client]_[NNN]_[Price]CHF.docx` convention
- [ ] `valid_until` is AFTER `offer_date` (minimum 7 days, default 14 days)
- [ ] VAT treatment matches client country
- [ ] UID `CHE-344.886.977` in header and footer
- [ ] IBAN `CH47 8080 8001 2242 9436 1` in footer
- [ ] Swiss apostrophe thousands separator: `1'000.00`
- [ ] No blank paragraphs anywhere — use 4pt spacing only
- [ ] Commission section present ONLY if specified
- [ ] Commission: reporting deadline (5th of month) and currency specified
- [ ] Signature: Calvin Heim, Founder
- [ ] Gender-appropriate salutation

---

## Best Practices Reference

### Swiss Bookkeeping Requirements
- UID on all outgoing documents
- IBAN on all invoices and offers
- Date format: DD.MM.YYYY
- Currency: CHF default, EUR for commission if client invoices in EUR
- Thousands separator: apostrophe `1'000.00`
- VAT basis: always cite the legal article

### VAT Rules (B2B Services)
- **EU/Germany**: 0% Reverse Charge — Art. 8 Abs. 1 MWSTG (Empfängerortsprinzip)
- **Non-EU**: 0% Export — Art. 8 Abs. 1 MWSTG
- **Switzerland**: 8.1% MWST (only if VAT-registered; threshold CHF 100'000)

### Offer Number Format
- 3-digit zero-padded: `004`, `005`, `010`
- Used in filename and in document header as full ref: `2026-004`
- Always ask user to confirm next number

### Validity
- Default: offer date + 14 calendar days
- Never set valid_until before or on offer_date
- Minimum: 7 days

### Commission Structures
- Specify: %, basis (net revenue), reporting party, deadline, currency
- Default deadline: 5th of following month
- Default currency: match client's (usually EUR for DACH)

### Cross-Border Payments
- Always include bank fee clause
- EUR payments: state exchange rate basis (tagesaktuell or fixed)

---

## Example Invocation

```
/offer AutomateDemand, David Kwint, Kronprinzstrasse 10 40217 Düsseldorf Deutschland,
Projekt heycare, 800 CHF Base + 10% Provision, Offert-Nr. 005
```

Output: `Offerte_AutomateDemand_005_800CHF.docx` saved to `~/Documents/Offerten/`
