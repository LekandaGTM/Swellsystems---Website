const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Footer, AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign
} = require('docx');
const fs = require('fs');

// A4 dimensions & margins (DXA: 1440 = 1 inch)
const PAGE_W = 11906;
const MARGIN = 1417; // 2.5cm
const USABLE = PAGE_W - 2 * MARGIN; // 9072

// Colors
const BORDER_CLR = "CCCCCC";
const BG_GREY = "F2F2F2";
const FOOTER_CLR = "888888";

// Font sizes (half-points)
const S18 = 36, S11 = 22, S10 = 20, S8 = 16;

// Borders
const bd = { style: BorderStyle.SINGLE, size: 4, color: BORDER_CLR };
const borders = { top: bd, bottom: bd, left: bd, right: bd };

// Standard spacing: 0pt before, 6pt after
const sp = { before: 0, after: 120 };

function p(children, spacing = sp) {
  return new Paragraph({ spacing, children: Array.isArray(children) ? children : [children] });
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
    ...(shaded ? { shading: { fill: BG_GREY, type: ShadingType.CLEAR } } : {}),
    children: Array.isArray(children) ? children : [children],
  });
}

function hdrCell(text, width) {
  return cell([p(b(text))], width, true);
}

// Column widths
const PC = [620, 4980, 820, 1300, 1352]; // positions: total = 9072
const TC = [2200, 6872];                  // payment terms: total = 9072

const tblMargins = { top: 100, bottom: 100, left: 160, right: 160 };

const posTable = new Table({
  columnWidths: PC,
  margins: tblMargins,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("Pos.", PC[0]),
      hdrCell("Beschreibung", PC[1]),
      hdrCell("Menge", PC[2]),
      hdrCell("Einzelpreis", PC[3]),
      hdrCell("Gesamt", PC[4]),
    ]}),
    new TableRow({ children: [
      cell(p(t("1")), PC[0]),
      cell(p([b("GTM Service \u2013 Basisverg\u00fctung: "), t("Setup, Beratung und operative Umsetzung der vereinbarten GTM-Aufgaben f\u00fcr das Projekt heycare.")]), PC[1]),
      cell(p(t("1")), PC[2]),
      cell(p(t("800.00 CHF")), PC[3]),
      cell(p(t("800.00 CHF")), PC[4]),
    ]}),
    new TableRow({ children: [
      cell(p(t("2")), PC[0]),
      cell(p([b("Erfolgsbasierte Umsatzbeteiligung \u2013 "), t("10% auf Netto-Kundenumsatz (z.B. 200.00 CHF bei 2\u2019000.00 CHF Kundenumsatz). Monatl. Abrechnung, Reporting bis 5. des Folgemonats.")]), PC[1]),
      cell(p(t("\u2013")), PC[2]),
      cell(p(t("10%")), PC[3]),
      cell(p(t("Variabel")), PC[4]),
    ]}),
    new TableRow({ children: [
      cell(p(t("")), PC[0]),
      cell(p(t("Mehrwertsteuer (0% Export / Reverse Charge)*")), PC[1]),
      cell(p(t("")), PC[2]),
      cell(p(t("")), PC[3]),
      cell(p(t("0.00 CHF")), PC[4]),
    ]}),
    new TableRow({ children: [
      cell(p(t("")), PC[0]),
      cell(p(b("TOTAL (Basisbetrag), zuz\u00fcglich Provision Pos. 2")), PC[1]),
      cell(p(t("")), PC[2]),
      cell(p(t("")), PC[3]),
      cell(p(b("800.00 CHF")), PC[4]),
    ]}),
  ],
});

const payTable = new Table({
  columnWidths: TC,
  margins: tblMargins,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("Bezeichnung", TC[0]),
      hdrCell("Detail", TC[1]),
    ]}),
    new TableRow({ children: [
      cell(p(b("Basisverg\u00fctung")), TC[0]),
      cell(p(t("800.00 CHF, zahlbar innerhalb von 10 Arbeitstagen nach Rechnungsstellung (netto).")), TC[1]),
    ]}),
    new TableRow({ children: [
      cell(p(b("Provisionsabrechnung")), TC[0]),
      cell(p(t("10% des Netto-Kundenumsatzes, monatlich nachtr\u00e4glich. AutomateDemand liefert Umsatz\u00fcbersicht bis zum 5. des Folgemonats. Abrechnung in EUR zum Tageskurs.")), TC[1]),
    ]}),
    new TableRow({ children: [
      cell(p(b("Bankspesen")), TC[0]),
      cell(p(t("Allf\u00e4llige Spesen f\u00fcr grenz\u00fcberschreitende Zahlungen gehen zu Lasten des Auftraggebers.")), TC[1]),
    ]}),
    new TableRow({ children: [
      cell(p(b("G\u00fcltigkeit")), TC[0]),
      cell(p(t("Diese Offerte ist g\u00fcltig bis 06.04.2026.")), TC[1]),
    ]}),
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
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN + 800, left: MARGIN },
      },
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            spacing: { before: 80, after: 40 },
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_CLR } },
            children: [t("LeadLab GmbH | Espenmoosstrasse 6, 9008 St. Gallen | calvin@heimdigital.ch | 079 649 52 98 | www.heimdigital.ch", { color: FOOTER_CLR, size: S8 })],
          }),
          p(t("Bank: Raiffeisen | IBAN: CH47 8080 8001 2242 9436 1 | UID: CHE-344.886.977", { color: FOOTER_CLR, size: S8 }), { before: 0, after: 0 }),
        ],
      }),
    },
    children: [
      // Title — large, clear gap below
      p(b("OFFERTE", S18), { before: 0, after: 280 }),

      // Header block — tight between lines, bigger gap after block
      p([b("Absender: "), t("LeadLab GmbH, Espenmoosstrasse 6, 9008 St. Gallen | UID: CHE-344.886.977")], { before: 0, after: 60 }),
      p([b("Empf\u00e4nger: "), t("AutomateDemand, David Kwint, Kronprinzstrasse 10, 40217 D\u00fcsseldorf, Deutschland")], { before: 0, after: 60 }),
      p([b("Datum: "), t("23.03.2026"), b("   |   Offert-Nr.: "), t("2026-004"), b("   |   G\u00fcltig bis: "), t("06.04.2026")], { before: 0, after: 280 }),

      // Offer title — clearly separated
      p(b("Offerte: GTM (Go-to-Market) Service \u2013 Projekt heycare", S11), { before: 0, after: 200 }),

      // Salutation + intro — comfortable reading spacing
      p(t("Sehr geehrter Herr Kwint,"), { before: 0, after: 160 }),
      p(t("Vielen Dank f\u00fcr das angenehme Gespr\u00e4ch. Basierend auf Ihren Anforderungen unterbreite ich Ihnen gerne folgende Offerte f\u00fcr die Erf\u00fcllung des GTM-Projekts heycare."), { before: 0, after: 320 }),

      // Positions table
      posTable,

      // Payment heading — clear gap above and below
      p(b("Zahlungsbedingungen & Abrechnung", S11), { before: 400, after: 160 }),

      // Payment table
      payTable,

      // Footnote — small, set apart
      p(t("*Steuerbefreite Dienstleistung gem\u00e4ss Art. 8 Abs. 1 MWSTG (Empf\u00e4ngerortsprinzip). Die Umsatzsteuerschuld geht im Rahmen des Reverse-Charge-Verfahrens auf den Leistungsempf\u00e4nger (AutomateDemand) in Deutschland \u00fcber.", { italics: true, size: S8 }), { before: 160, after: 400 }),

      // Closing
      p(t("Bei Fragen stehe ich Ihnen gerne zur Verf\u00fcgung. Ich freue mich auf die Zusammenarbeit!"), { before: 0, after: 360 }),
      p(t("Freundliche Gr\u00fcsse"), { before: 0, after: 80 }),
      p(t("Calvin Heim \u2013 Founder, LeadLab GmbH"), { before: 0, after: 0 }),
    ],
  }],
});

const out = "/Users/calvinheim/Documents/Buchhaltung CIS Group GmbH/2026/Q1/Offerte_AutomateDemand_004_800CHF.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(out, buf);
  console.log("Saved:", out);
}).catch(err => console.error(err));
