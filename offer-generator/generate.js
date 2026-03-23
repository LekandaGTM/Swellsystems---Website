const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Footer, BorderStyle, WidthType, ShadingType, VerticalAlign
} = require('docx');
const fs = require('fs');

const PAGE_W = 11906;
const MARGIN = 1417; // 2.5cm

const BORDER_CLR = "CCCCCC";
const BG_GREY    = "F2F2F2";
const FOOTER_CLR = "999999";

// Font sizes in half-points
const S24 = 48, S14 = 28, S11 = 22, S10 = 20, S9 = 18, S8 = 16;

const bd = { style: BorderStyle.SINGLE, size: 4, color: BORDER_CLR };
const borders = { top: bd, bottom: bd, left: bd, right: bd };

function p(children, before = 0, after = 0) {
  return new Paragraph({
    spacing: { before, after },
    children: Array.isArray(children) ? children : [children],
  });
}

function t(text, opts = {}) {
  return new TextRun({ text, font: "Calibri", size: S10, ...opts });
}

function b(text, size = S10) {
  return new TextRun({ text, font: "Calibri", size, bold: true });
}

function cell(children, width, shaded = false) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 140, bottom: 140, left: 180, right: 180 },
    ...(shaded ? { shading: { fill: BG_GREY, type: ShadingType.CLEAR } } : {}),
    children: Array.isArray(children) ? children : [children],
  });
}

function hdrCell(text, width) {
  return cell([p(b(text), 0, 0)], width, true);
}

// A4 usable width: 11906 - 2*1417 = 9072
const PC = [620, 4980, 820, 1300, 1352]; // positions table
const TC = [2300, 6772];                  // payment table

function posRow(pos, desc, qty, price, total) {
  return new TableRow({ children: [
    cell(p(t(pos), 0, 0), PC[0]),
    cell(p(desc, 0, 0), PC[1]),
    cell(p(t(qty), 0, 0), PC[2]),
    cell(p(t(price), 0, 0), PC[3]),
    cell(p(t(total), 0, 0), PC[4]),
  ]});
}

const posTable = new Table({
  columnWidths: PC,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("Pos.", PC[0]),
      hdrCell("Beschreibung", PC[1]),
      hdrCell("Menge", PC[2]),
      hdrCell("Einzelpreis", PC[3]),
      hdrCell("Gesamt", PC[4]),
    ]}),
    posRow("1",
      [b("GTM Service \u2013 Basisverg\u00fctung: "), t("Setup, Beratung und operative Umsetzung der vereinbarten GTM-Aufgaben f\u00fcr das Projekt heycare.")],
      "1", "800.00 CHF", "800.00 CHF"),
    posRow("2",
      [b("Erfolgsbasierte Umsatzbeteiligung \u2013 "), t("10% auf Netto-Kundenumsatz (z.B. 200.00 CHF bei 2\u2019000.00 CHF Kundenumsatz). Monatl. Abrechnung, Reporting bis 5. des Folgemonats.")],
      "\u2013", "10%", "Variabel"),
    posRow("", t("Mehrwertsteuer (0% Export / Reverse Charge)*"), "", "", "0.00 CHF"),
    new TableRow({ children: [
      cell(p(t(""), 0, 0), PC[0]),
      cell(p(b("TOTAL (Basisbetrag), zuz\u00fcglich Provision Pos. 2"), 0, 0), PC[1]),
      cell(p(t(""), 0, 0), PC[2]),
      cell(p(t(""), 0, 0), PC[3]),
      cell(p(b("800.00 CHF"), 0, 0), PC[4]),
    ]}),
  ],
});

function payRow(label, detail) {
  return new TableRow({ children: [
    cell(p(b(label), 0, 0), TC[0]),
    cell(p(t(detail), 0, 0), TC[1]),
  ]});
}

const payTable = new Table({
  columnWidths: TC,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("Bezeichnung", TC[0]),
      hdrCell("Detail", TC[1]),
    ]}),
    payRow("Basisverg\u00fctung",
      "800.00 CHF, zahlbar innerhalb von 10 Arbeitstagen nach Rechnungsstellung (netto)."),
    payRow("Provisionsabrechnung",
      "10% des Netto-Kundenumsatzes, monatlich nachtr\u00e4glich. AutomateDemand liefert Umsatz\u00fcbersicht bis zum 5. des Folgemonats. Abrechnung in EUR zum Tageskurs."),
    payRow("Bankspesen",
      "Allf\u00e4llige Spesen f\u00fcr grenz\u00fcberschreitende Zahlungen gehen zu Lasten des Auftraggebers."),
    payRow("G\u00fcltigkeit",
      "Diese Offerte ist g\u00fcltig bis 06.04.2026."),
  ],
});

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: S10 } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: 16838 },
        margin: { top: 1700, right: MARGIN, bottom: 1800, left: MARGIN },
      },
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            spacing: { before: 120, after: 60 },
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_CLR } },
            children: [t("LeadLab GmbH | Espenmoosstrasse 6, 9008 St. Gallen | calvin@heimdigital.ch | 079 649 52 98 | www.heimdigital.ch", { color: FOOTER_CLR, size: S8 })],
          }),
          p(t("Bank: Raiffeisen | IBAN: CH47 8080 8001 2242 9436 1 | UID: CHE-344.886.977", { color: FOOTER_CLR, size: S8 }), 0, 0),
        ],
      }),
    },
    children: [
      // ── OFFERTE Title ──────────────────────────────────────────
      p(b("OFFERTE", S24)),
      p(t("")),

      // ── Header block ───────────────────────────────────────────
      p([b("Absender: "), t("LeadLab GmbH, Espenmoosstrasse 6, 9008 St. Gallen | UID: CHE-344.886.977")]),
      p([b("Empf\u00e4nger: "), t("AutomateDemand, David Kwint, Kronprinzstrasse 10, 40217 D\u00fcsseldorf, Deutschland")]),

      // Datum line with bottom rule as visual separator
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER_CLR } },
        children: [b("Datum: "), t("23.03.2026"), b("   |   Offert-Nr.: "), t("2026-004"), b("   |   G\u00fcltig bis: "), t("06.04.2026")],
      }),
      p(t("")),
      p(t("")),

      // ── Offer subject ──────────────────────────────────────────
      p(b("Offerte: GTM (Go-to-Market) Service \u2013 Projekt heycare", S14)),
      p(t("")),

      // ── Salutation & intro ─────────────────────────────────────
      p(t("Sehr geehrter Herr Kwint,")),
      p(t("")),
      p(t("Vielen Dank f\u00fcr das angenehme Gespr\u00e4ch. Basierend auf Ihren Anforderungen unterbreite ich Ihnen gerne folgende Offerte f\u00fcr die Erf\u00fcllung des GTM-Projekts heycare.")),
      p(t("")),
      p(t("")),

      // ── Positions table ────────────────────────────────────────
      posTable,
      p(t("")),
      p(t("")),

      // ── Payment section ────────────────────────────────────────
      p(b("Zahlungsbedingungen & Abrechnung", S14)),
      p(t("")),
      payTable,
      p(t("")),

      // ── Footnote ───────────────────────────────────────────────
      p(t("*Steuerbefreite Dienstleistung gem\u00e4ss Art. 8 Abs. 1 MWSTG (Empf\u00e4ngerortsprinzip). Die Umsatzsteuerschuld geht im Rahmen des Reverse-Charge-Verfahrens auf den Leistungsempf\u00e4nger (AutomateDemand) in Deutschland \u00fcber.", { italics: true, size: S8, color: "666666" })),
      p(t("")),
      p(t("")),

      // ── Closing ────────────────────────────────────────────────
      p(t("Bei Fragen stehe ich Ihnen gerne zur Verf\u00fcgung. Ich freue mich auf die Zusammenarbeit!")),
      p(t("")),
      p(t("")),
      p(t("")),
      p(t("Freundliche Gr\u00fcsse")),
      p(t("")),
      p(t("Calvin Heim \u2013 Founder, LeadLab GmbH")),
    ],
  }],
});

const out = "/Users/calvinheim/Documents/Buchhaltung CIS Group GmbH/2026/Q1/Offerte_AutomateDemand_004_800CHF.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(out, buf);
  console.log("Saved:", out);
}).catch(err => console.error(err));
