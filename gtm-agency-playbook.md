# Building Your GTM Agency: The Full Playbook

This is everything you need to go from zero to a running agency. No fluff.

---

## Topics Index

> Full log of every topic discussed. Use this as the master reference — nothing should live only in someone's head.
>
> **Legend:** ✅ Decided | ⚠️ Needs deeper thinking | 🔲 Backlog / deferred

### Agency Fundamentals
| Status | Topic | Decision / Notes |
|--------|-------|-----------------|
| ✅ | Agency name | Swellsystems |
| ✅ | Market | German-speaking Switzerland |
| ✅ | Outreach language | German, Sie-form |
| ✅ | Phase 1 outreach channel | Email only. LinkedIn outreach deferred to phase 2. |
| ✅ | Monthly tool budget (own use) | ~700 CHF/mo ceiling |
| ⚠️ | Positioning & ICP | Not defined yet. Needed before Zefix workflow and campaign copy can be built. Separate session planned. |

### Tool Stack
| Status | Topic | Decision / Notes |
|--------|-------|-----------------|
| ✅ | Clay | Explorer plan at $349/mo (grandfathered). Use own account for Swellsystems outreach. |
| ✅ | Apollo | Not needed. Clay's built-in enrichment providers (Prospeo, Hunter) replace it. |
| ✅ | Email infrastructure | Zapmail (~$97/mo). Handles domain registration, mailboxes, DNS, warmup in one place. |
| ✅ | Sending domains | 3-4 burner domains (swellsys.ch, swell-systems.com, etc.). Never send from swellsystems.ch. |
| ✅ | Email sending | Instantly Growth ($47/mo) |
| ✅ | Prospect discovery | LinkedIn Sales Navigator Core ($99/mo) until Zefix workflow is live |
| ✅ | Clay AI credits | Own OpenAI API key (~$30/mo) — cheaper than Clay's native AI |
| ✅ | AI assistant | Claude Pro ($20/mo) |
| ✅ | Bookkeeping | Bexio (49 CHF/mo) — required for Swiss invoicing and VAT |
| ✅ | CRM | HubSpot Free |
| ⚠️ | Clay new pricing | Clay Growth is now $495/mo for new accounts. Grandfathered Explorer stays at $349 for own use. Impact on client pass-through pricing not yet decided. |
| 🔲 | Trigify | Phase 2. LinkedIn social signal layer for intent-based targeting (~$99-199/mo). |
| 🔲 | Heyreach | Phase 2. LinkedIn outreach automation for email + LinkedIn combo (~$79-99/mo). |
| 🔲 | AI Ark | Evaluate only if Clay email find rate on Swiss companies drops below 50%. |

### Service & Pricing Model
| Status | Topic | Decision / Notes |
|--------|-------|-----------------|
| ✅ | Pricing structure | Monthly retainer only. No setup fee — onboarding and infra setup is included in retainer. No hourly pricing. |
| ✅ | Tool costs for clients | Client pays for all tools directly in their own name. Not included in retainer. |
| ✅ | Ownership model | Client owns everything. When contract ends, infrastructure stays live without Swellsystems. |
| ✅ | No Apollo for clients | Client stack mirrors Swellsystems own stack — no Apollo needed. |
| ✅ | Two service products | Product A: DFY (you host in your Clay, seat fee). Product B: Build & Transfer (build in your Clay, migrate to theirs after 3 months). See Section 2. |
| ✅ | Clay hosting model | Resolved via two-product model. DFY = hosted in your Clay. Build & Transfer = migrates to client's Clay ($495/mo) after trial. Migration included in retainer, no extra fee. |
| ✅ | Base retainer | €3-4K/mo standard. First 2-3 clients at €2-3K in exchange for video testimonial. |
| ✅ | No setup fee | Onboarding is part of the service, not a separate charge. |
| ✅ | No migration fee | Migration to client Clay account included in retainer for Build & Transfer clients. |
| ✅ | Performance fallback | If client pushes back on retainer: lower base + % of ACV per meeting booked. % TBD per client based on their ACV. |
| ✅ | Meeting booked definition | A meeting counts as booked when a positive reply from Swellsystems campaign results in a scheduled call/demo — regardless of who handles the follow-up call. |
| ✅ | Follow-up calls | Client handles internally. Agree on follow-up SLA per client (target: reply within 2 hours of positive reply). |
| ✅ | Testimonial clause | For discounted first clients: include explicit contract clause — video testimonial delivered within 30 days of contract end. |
| ⚠️ | Performance % | % of ACV per meeting booked not yet defined. Needs to be set per client based on their ACV. Industry range: 3-10% of ACV. |

### Prospecting & Data
| Status | Topic | Decision / Notes |
|--------|-------|-----------------|
| ✅ | Primary prospecting source | LinkedIn Sales Navigator (for now) |
| 🔲 | Zefix scraping workflow | Build Clay workflow pulling from zefix.ch + Moneyhouse to replace LinkedIn SalesNav ($99/mo saved). Blocked on ICP definition. |

### LinkedIn & Content
| Status | Topic | Decision / Notes |
|--------|-------|-----------------|
| 🔲 | LinkedIn profile | Calvin Heim profile needs to reflect Swellsystems positioning. Deferred until positioning is locked. |
| 🔲 | LinkedIn content | 3-4 posts/week cadence. Deferred until positioning is defined. |

---

## 1. Positioning — The Most Important Decision You'll Make

### The Core Problem

Most people starting a GTM agency say: *"We do outbound, ABM, content, and RevOps for B2B companies."* That's a description, not a position. You become a commodity before you start.

**The question to answer first:** What is the one thing you are unusually good at, for a specific type of company, that produces a specific result?

### How to Position Yourself

Pick a niche on **two axes:**

| Axis | Examples |
|------|---------|
| **Who** | Series A SaaS, B2B fintech, DACH Mittelstand, healthcare software |
| **What** | Cold outbound systems, LinkedIn pipeline, signal-based outreach, RevOps |

Good positioning examples:
- "We build signal-based outbound systems for Series A B2B SaaS with $0 outbound history"
- "We run LinkedIn-led pipeline generation for German B2B tech companies selling into enterprise"
- "We set up the full outbound infrastructure (data, tooling, messaging) for SaaS founders transitioning out of founder-led sales"

### The Intent-Acumen Gap

Most companies have intent data (or hiring signals, or enrichment tools), but they lack the **business acumen to interpret what those signals mean for the prospect's P&L**. Your angle could be the same: "We don't just run outreach, we connect signals to business impact."

This is the difference between:
> "I saw you recently hired 3 SDRs" (observation)

vs.

> "You just added 3 SDRs without a sequencing system. At your stage, that's 4,200 wasted rep-hours per quarter on manual prospecting." (acumen)

**Whoever can do the second version wins the client.**

### What to Avoid

- Being "full service" from day 1 — you can't execute it and can't sell it
- Positioning around tools ("We use Clay and Apollo") — tools are commodities
- Positioning around activities ("we send emails") — clients buy outcomes
- Competing on price

---

## 2. Pricing — The Framework

### The Two Products

**Product A — Done For You (DFY)**
- You build and run everything inside your own Clay account
- Client pays a seat fee (~€150-200/mo) instead of their own Clay subscription
- Lower barrier to entry — no $495 Clay bill on top of your retainer
- When contract ends: CSV export of contacts. Automations and workflow logic stay in your account — client gets no live system
- Must be disclosed clearly in the contract

**Product B — Build & Transfer (B&T)**
- 3-month minimum commitment
- You build and run the system inside your own Clay during the trial phase
- After 3 months, client decides to take ownership → you migrate everything into their own Clay account ($495/mo)
- Migration is included in the retainer — no extra fee
- When contract ends: their infrastructure stays fully live. Nothing disappears.
- Strongest value proposition — "you own a running system regardless of what happens with us"

---

### Retainer Pricing

| Stage | Monthly Retainer | Notes |
|-------|-----------------|-------|
| **First 2-3 clients** | €2,000–€3,000 | Discounted in exchange for video testimonial |
| **Standard** | €3,000–€4,000 | Once you have 1-2 case studies |
| **Premium** | €4,000+ | Once system is proven and results are documented |

- **No setup fee** — onboarding, infrastructure setup, and Clay build are included in the retainer
- **No migration fee** — transfer to client's Clay account is included for B&T clients
- **No hourly pricing** — ever
- **Minimum 3-month commitment** from day one

---

### Performance Fallback Model

If a client pushes back on the base retainer, offer a lower base + performance bonus per meeting booked:

- **Meeting booked definition:** A meeting counts when a positive reply from a Swellsystems campaign results in a scheduled call or demo — regardless of who handles the follow-up call
- **Performance %:** % of client's ACV per meeting booked. Set per client based on their deal size. Industry range: 3-10% of ACV
- **Follow-up responsibility:** Client handles follow-up calls internally. Agree on SLA upfront — target: contact positive replies within 2 hours

This model protects you if they resist the retainer and lets you earn back on results. Most clients end up in the same range once meetings start flowing.

---

### Testimonial Clause (First Clients)

For any client on the discounted €2-3K rate, include this clause explicitly in the contract:

> *"Client agrees to provide a 2-3 minute video testimonial within 30 days of contract end."*

Do not rely on verbal agreement — people get busy. The clause removes the awkwardness of chasing it later.

---

### Tool Costs

Client subscribes to all tools directly in their own name — tools are never included in the retainer and never billed through Swellsystems. Retainer = your time and execution only.

**Typical client tool stack:**

| Tool | Purpose | Cost/mo |
|------|---------|---------|
| Clay Growth | Enrichment, personalization, verification | $495 |
| Zapmail | Email infrastructure — domains, mailboxes, DNS, warmup | ~$97 |
| Instantly Growth | Email sending, campaign management | $47 |
| LinkedIn Sales Navigator | Prospect discovery | $99 |
| OpenAI API | Clay AI credits | ~$30 |
| **Total** | | **~$768/mo** |

Present this in proposals as: *"You subscribe to the tools directly at ~€750/mo. My retainer covers everything else."*

---

### What Clients Are Actually Buying

They're not buying "emails" or "Clay workflows." They're buying:
1. **Time back** — manual prospecting off their plate
2. **Pipeline certainty** — predictable meetings per month
3. **A system they own** — infrastructure that keeps running whether they stay with you or not

Price against those outcomes, not against your hours.

---

## 3. The Tool Stack — With Real Costs

**Market:** German-speaking Switzerland | **Outreach:** Email only (phase 1) | **Budget ceiling:** ~700 CHF/mo

### Phase 1: Launch Stack

| Tool | Purpose | Cost/mo |
|------|---------|---------|
| **Clay** (Explorer) | Enrichment, personalization, email verification | $349 |
| **Zapmail** | Email infrastructure — domains, mailboxes, warmup, DNS | ~$97 |
| **Instantly.ai** (Growth) | Email sending, campaign management | $47 |
| **LinkedIn Sales Navigator** | Prospect discovery (until Zefix workflow is live) | $99 |
| **OpenAI API** | Clay AI credits — cheaper than Clay's native AI | ~$30 |
| **Claude Pro** | Research, copy, agent workflows | $20 |
| **Bexio** | Swiss bookkeeping + invoicing | 49 CHF |
| **HubSpot** (Free) | CRM, pipeline tracking | $0 |
| **Total** | | **~$642 + 49 CHF** |

**Why no Apollo?** Clay Explorer's built-in enrichment providers (Prospeo, Hunter, and others) replace Apollo for contact data. No need to pay for both.

**Why Zapmail instead of Google Workspace?** Zapmail handles domain registration, mailbox setup, SPF/DKIM/DMARC, and warmup in one place. Removes the most painful part of email infrastructure setup.

> **Note:** Once the Zefix scraping workflow is live, drop LinkedIn Sales Navigator ($99/mo saved). See Backlog.

### Phase 2: Scaling (3-6 clients)

~€1,200-1,800/month

| Tool | Purpose | Cost/month |
|------|---------|------------|
| **Clay** (Explorer/Pro) | More credits, more workflows | €400-800 |
| **Heyreach** | LinkedIn outreach automation (email + LinkedIn combo) | €79-99 |
| **Trigify** | LinkedIn social signal layer for intent-based targeting | €99-199 |
| **Cognism** | GDPR-compliant data, especially DACH | €300-500 (negotiable) |
| **n8n** (cloud) | Workflow automation | €20-50 |

**Clay is the highest-leverage tool in your stack.** It replaces 4-5 other tools for enrichment and orchestration. Become an expert here first.

### Phase 3: Established (6+ clients, own team)

~€3,000-5,000/month (but billable to clients)

- ZoomInfo or Cognism at full license
- Dedicated email warmup infrastructure
- Client-specific tool costs billed back to client

**Key principle:** Once you're established, the infrastructure costs for each client should be included in their setup fee or billed as pass-through. You shouldn't be absorbing their Clay credits.

---

## 4. Client Acquisition — How to Fill Your Own Pipeline

### Channel Priority

**Channel 1: LinkedIn Organic (Highest ROI, Slowest Start)**

This is your primary channel. A GTM agency that can't generate its own clients via GTM is a credibility problem.

What to post:
- Breakdowns of outbound systems you've built (with numbers)
- Before/after case studies (anonymized if needed)
- Hot takes on common mistakes ("Why your reply rate is <2% — a thread")
- Behind-the-scenes of client campaigns (with permission)
- Screenshots + commentary on campaigns that worked

Cadence: 3-4 posts/week minimum for 90 days before expecting inbound.

**What NOT to post:** Generic motivational content, "we're hiring," buzzword salad about "AI-powered GTM."

**Channel 2: Cold Outreach (Eat Your Own Dog Food)**

You are your own best case study. Run your exact methodology on your own outbound.

Target: CEOs/Founders of Series A SaaS, VP Sales, Head of Growth. Companies with 15-80 employees, 12+ months post-funding, no clear outbound motion.

Signals to look for:
- Recently hired 1-3 SDRs (they'll need to be productive fast)
- Recently raised funding (growth mandate)
- Job posting for "Outbound Sales Manager" (they want to build it but don't know how)
- LinkedIn posts by the founder about "struggling to scale pipeline"

**Channel 3: Referrals and Partnerships (Best Close Rate)**

Build relationships with:
- **VC portfolio support teams** — One relationship = multiple clients
- **HubSpot/Salesforce implementation partners** — They do the CRM, you do the pipeline generation
- **Fractional CMO/CRO networks** — They need execution partners
- **Adjacent agencies** (content, paid, web) — Refer each other

**Channel 4: Community Presence**

Where your buyers hang out:
- RevGenius (Slack)
- GTM community
- SaaS-specific Slack communities

Don't just lurk — answer questions, share frameworks, be visible.

---

## 5. The Sales Process

### Stages

```
Inbound/Outbound Lead → Discovery Call (30 min) → Diagnostic Workshop (60 min) → Proposal → Close
```

### Discovery Call Goal

Don't pitch. Diagnose. You're a doctor, not a salesperson.

Questions that open deals:
- "Walk me through your current outbound motion — what's actually happening week to week?"
- "What's your current cost to acquire a meeting? And what's a meeting worth to you?"
- "If we doubled your meetings booked next quarter, what does that do to the business?"
- "What have you tried before? What failed and why?"

### The Diagnostic Workshop

Before writing a proposal, do a paid or free 60-min workshop where you:
1. Map their current GTM motion
2. Identify the 2-3 biggest leaks in their pipeline
3. Show them what a fixed version looks like

Even if they don't buy, you get deep intel. And most people who go through a real diagnostic do buy — because you've already shown competence.

### Proposal Structure

1. **Current State** — Mirror their pain back (use their exact words from discovery)
2. **Root Cause** — Why the problem exists (not their fault, structural)
3. **The Solution** — Your system, not a list of activities
4. **Timeline & Milestones** — Week 1-12, what they'll see and when
5. **Investment** — 3 tiers, recommend the middle
6. **ROI Frame** — If we book X meetings at Y% close rate at Z ACV, this pays back in N weeks

**Never send a proposal without a call to present it.** Proposals sent via email die. Proposals walked through live close.

### Objection Handling

| Objection | Response |
|-----------|----------|
| "Too expensive" | "What's your cost to hire and ramp an SDR? €60K salary + 6 months ramp + tools = €80-100K before you see ROI. We get you there in 6 weeks for a fraction of that." |
| "We tried outbound before, it didn't work" | "What specifically didn't work? Delivery? Copy? Targeting? Most failed outbound is a data or messaging problem, not a channel problem." |
| "We need to think about it" | "Absolutely. What specifically do you need to feel confident? Is it the ROI, the timing, or something about the approach?" |
| "We're doing it in-house" | "Who's running it? And what's their current win rate? The question is whether they have the system or if they're winging it." |

---

## 6. The First 90 Days — Swellsystems Launch Plan

### Phase 0 — Business Setup (Day 1)

- [ ] Confirm business entity is registered (Einzelfirma minimum)
- [ ] Sign up for Bexio (49 CHF/mo)
  - Connect Swiss bank account
  - Set up Swellsystems invoice template
  - Configure VAT settings (if VAT-registered)
- [ ] Confirm swellsystems.ch DNS is accessible and you have registrar access

---

### Phase 1 — Email Infrastructure (Day 1–3)

> Start this first. Warmup takes 3–4 weeks. Nothing else can launch until mailboxes are warm.

- [ ] Sign up for Zapmail
- [ ] Register 3–4 sending domains — variations of your brand, never swellsystems.ch:
  - swellsys.ch
  - swell-systems.com
  - swellsystems.io
  - swellsys.com
- [ ] Connect all domains to Zapmail
- [ ] Create 2 mailboxes per domain (6–8 total)
  - Naming: calvin@, hello@, team@, info@
- [ ] Zapmail configures SPF, DKIM, DMARC on each domain — verify all pass
- [ ] Sign up for Instantly Growth ($47/mo)
- [ ] Connect all mailboxes from Zapmail into Instantly
- [ ] Enable warmup on every mailbox in Instantly immediately
  - Start: 5 emails/day per mailbox
  - Ramp target: 30 emails/day per mailbox by week 4
- [ ] Do NOT send any campaigns until warmup is at least 3 weeks in

---

### Phase 2 — Tool Setup (Day 1–3, parallel to Phase 1)

- [ ] Subscribe to LinkedIn Sales Navigator Core ($99/mo)
- [ ] Sign up for OpenAI API (platform.openai.com)
  - Add $50 starting credits
  - Copy API key
  - In Clay: Settings → AI → paste OpenAI API key
- [ ] Confirm Claude Pro subscription is active ($20/mo)
- [ ] Set up HubSpot free account
  - Create pipeline: Prospect → Replied → Meeting Booked → Proposal → Closed Won → Closed Lost
  - Add Swellsystems branding

---

### Phase 3 — Clay Setup (Week 1–2)

- [ ] Create new Clay table: `Swellsystems — Swiss ICP Prospects`
- [ ] Import initial prospect list from LinkedIn Sales Navigator
  - Filter: Switzerland, German-speaking cantons, [ICP industry — TBD in positioning session], [ICP company size — TBD], [ICP job title — TBD]
- [ ] Add company enrichment columns:
  - [ ] Website (Clay native)
  - [ ] LinkedIn company URL (Clay native)
  - [ ] Employee count (Clay enrichment)
  - [ ] Industry / sector
- [ ] Add contact enrichment columns:
  - [ ] Decision maker name
  - [ ] LinkedIn profile URL
  - [ ] Email (via Prospeo → Hunter waterfall)
  - [ ] Email verification status (only push `valid` to Instantly)
- [ ] Build first-line personalization Claygent
  - Language: German, Sie-form
  - Goal: 1 sentence referencing something specific to the company
  - Use OpenAI API key (not Clay native AI) to cut costs
  - Test on 10 companies first, refine until output is natural
- [ ] Set up export to Instantly
  - Filter: only rows where email status = `valid`
  - Map fields: first name, last name, email, company, personalized first line

---

### Phase 4 — Campaign Copy (Week 2–3)

- [ ] Define ICP for first campaign (fill in from positioning session: industry, size, title)
- [ ] Read ALL mandatory files before writing a single word of copy:
  - [ ] `intelligence/cold-outreach-best-practices-dach.md`
  - [ ] `intelligence/cold-outreach-spam-triggers-dach.md`
  - [ ] `intelligence/cold-outreach-spam-triggers.md`
  - [ ] `intelligence/no-brainer-offers.md`
- [ ] Design a Tier 1 or Tier 2 no-brainer offer — something the prospect would normally pay for
- [ ] Write email sequence (3 emails):
  - Email 1: Hook (personalized first line) + offer
  - Email 2: Follow-up — different angle, shorter
  - Email 3: Soft break-up
- [ ] Run every email through German spam trigger checklist
- [ ] CTA rules (non-negotiable):
  - NO call/meeting/demo requests
  - NO Calendly links
  - Lead with value gift: "Darf ich Ihnen die Analyse zusenden?"
  - Use interest-based soft CTA: "Ist das gerade ein Thema bei Ihnen?"
- [ ] Test send all 3 emails to your own inbox — check formatting, links, signature

---

### Phase 5 — Instantly Campaign Setup (Week 3–4)

- [ ] Create new campaign in Instantly
- [ ] Upload verified leads exported from Clay
- [ ] Configure sending settings:
  - Max 30 emails/day per mailbox
  - Sending window: Monday–Friday, 08:00–18:00 CET
  - Random delays between sends: on
- [ ] Enable reply detection
- [ ] Set up unsubscribe handling (required under nDSG + GDPR)
- [ ] Activate campaign — only once mailboxes have 3+ weeks of warmup

---

### Phase 6 — Reply Management (Week 4+)

- [ ] Set up reply notification (email or Slack) so you see positive replies within minutes
- [ ] Define personal SLA: respond to positive replies within 2 hours
- [ ] When a positive reply comes in:
  - [ ] Log company + contact in HubSpot as a new deal
  - [ ] Move to "Replied" stage
  - [ ] Respond manually — no automation for replies
- [ ] Weekly: review reply rates per campaign, per email, per sending domain
- [ ] Monthly: review domain health in Instantly (spam rate, bounce rate)

---

### Backlog

> Ideas confirmed but not needed for launch. Prioritize after first campaign is running.

- [ ] **Zefix scraping workflow** — Build a Clay workflow that pulls Swiss companies directly from zefix.ch filtered by ICP criteria, cross-references Moneyhouse for management names, and feeds into the enrichment pipeline. Goal: replace LinkedIn Sales Navigator and save $99/mo. Requires ICP definition first.
- [ ] **Trigify** — Add LinkedIn social signal layer for signal-based targeting. Add once outbound is running and capacity exists to act on real-time signals (~$99–199/mo).
- [ ] **Heyreach** — LinkedIn outreach automation for email + LinkedIn combo sequences. Phase 2 once email channel is proven (~$79–99/mo).
- [ ] **AI Ark evaluation** — If Clay email find rate on Swiss companies drops below 50%, evaluate AI Ark as an additional data source.
- [ ] **LinkedIn profile optimization** — Calvin Heim profile updated to reflect Swellsystems positioning. Defer until positioning session is done.
- [ ] **LinkedIn content** — 3–4 posts/week once positioning is defined.

---

## 7. What Separates Good Agencies from Great Ones

1. **They over-document.** Every client engagement adds to a knowledge base that makes the next client faster and better.

2. **They set clear KPIs upfront.** "We'll generate X meetings in 90 days" — not "we'll do outreach."

3. **They fire bad clients early.** Clients who don't follow your process, miss calls, or change direction weekly will kill your capacity and morale.

4. **They compound learning across clients.** What works for Client A gets adapted for Client B. This is your moat. Tools can be copied; accumulated intelligence cannot.

5. **They produce content.** The best agencies are known for a point of view, not just services. Your LinkedIn is your most important sales asset.

---

## Quick Reference Summary

| Decision | Recommendation |
|----------|---------------|
| **Niche** | Pick one ICP + one core service first |
| **Positioning** | Outcome-based, signal-informed, not tool-based |
| **Setup Price** | €3,000-8,000 depending on scope |
| **Monthly Retainer** | €2,500-6,000 depending on stage |
| **Minimum Commitment** | 3 months always |
| **Primary Acquisition** | LinkedIn organic + own outbound |
| **Tool to master first** | Clay |
| **First 90 days goal** | 2 case studies with measurable numbers |
| **Biggest mistake** | Going broad too early |
