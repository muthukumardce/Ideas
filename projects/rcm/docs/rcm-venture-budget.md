# Venture budget and capital requirement

*Companion budget to the report “Competing in U.S. Healthcare RCM” (`competing-in-us-healthcare-rcm.md`). Section references such as §5.6, §11.4, or §15 point to that report; §18.x references are within this document. Figures are illustrative as of mid-2026, on a Chennai cost base at about ₹95/USD (verified: ₹95 was the June 2026 monthly average; spot ~₹96.4 in July 2026, 2026 range roughly ₹90–97 — further INR weakness cuts India-side costs in USD terms). Revised July 2026 after a fact-audit and CFO-style arithmetic review; see the Addendum in the main report. A note on phase labels: this budget's Phase 1/2/3 (mo 0–3 / 3–9 / 12–18+) map to the main report's §15 Phase 0–1 / 1–2 / 3 — the labels here track spend stages, not §15's numbering.*

This document sets out the capital requirement: how much the venture needs, what it funds, and what each tranche buys. It opens with the raise and the use of funds, then backs them with the underlying cost detail (staff, software, hardware, compliance) and the staged burn. Figures are illustrative as of June 2026, on a Chennai cost base at about ₹95/USD, and should be re-checked against live vendor pricing. Costs fall into three buckets: one-time setup, fixed monthly run-rate (mostly staff and tooling), and usage-based costs that scale with claim/call volume. The staged burn reconciles to §11.4 and the per-transaction economics in §5.6 and §7.2.1. The largest line by far is staff; software and infrastructure are a distant second; hardware is minor because almost all compute is cloud-hosted.

## Contents

- [18.1 The capital requirement (what it funds and what it buys)](#181-the-capital-requirement-what-it-funds-and-what-it-buys)
- [18.2 Phase 1 (mo 0–3): prove the wedge](#182-phase-1-mo-03-prove-the-wedge)
- [18.3 Phase 2 (mo 3–9): design partners live](#183-phase-2-mo-39-design-partners-live)
- [18.4 Phase 3 (mo 12–18+): productized and scaling](#184-phase-3-mo-1218-productized-and-scaling)
- [18.5 Unit-cost reference (software, infrastructure, and compliance)](#185-unit-cost-reference-software-infrastructure-and-compliance)
- [18.6 All-in roll-up (calendar-year, reconciles to §11.4)](#186-all-in-roll-up-calendar-year-reconciles-to-114)
- [18.7 The minimum viable budget](#187-the-minimum-viable-budget)

## 18.1 The capital requirement (what it funds and what it buys)

The venture is deliberately capital-light, so the raise is staged: a small pre-seed to reach proof, then a seed raised from strength (revenue plus references) only to accelerate, not to survive. Each tranche buys a specific milestone, not just runway.

| Round | Amount | When / trigger | What it funds | Milestone it buys |
|---|---|---|---|---|
| Pre-seed / angel | **\$150–250K** | Now (pre-revenue) | Founder + domain co-founder for ~9–12 months, SOC 2 Type II + entity/legal setup, core tooling | First paid pilot in production, 1–2 design partners, a labeled golden set, and the security packet (Phase 1 into early Phase 2, §15.2) |
| Seed | **\$1.5–3M** | ~Month 12–18, at ~\$300–500K ARR plus design-partner validation (the 2026 seed bar, §9, §15.3) | Scaling engineering, the U.S. GTM team (sales + customer success), HITRUST, and the HITL pool as volume grows | A credible path to the \$2–3M ARR Series A bar (Phase 3, §15) |
| Series A | **~\$10–20M** | At \$2–3M ARR | Multi-specialty expansion, enterprise GTM, category build | Scale (comparable to the \$8–21M Series A rounds peers raised, §9) |

Use of the pre-seed / angel tranche (the first round only), approximately (recomputed against the phase detail):
- ~40–50%: people — founder draw, domain co-founder, and the fractional U.S. GTM contact (staff is detailed per phase, §18.2–§18.4).
- ~20–30%: compliance and legal (SOC 2 Type II, U.S. entity, BAA, insurance). This is front-loaded and spends before revenue (§18.2, §18.5).
- ~10–15%: software, infrastructure, LLM, and clearinghouse (§18.5).
- ~10–15%: working-capital buffer.

The honest headline (see §18.7 for the reconciled math): **~\$150–200K funds only the lean two-person wedge-proof** (demo + labeled golden set + signed LOI — engineers and HITL deferred), while reaching **two paying in-production billers on the phased plan realistically needs ~\$285–420K through month 12** — which is why **~\$250–350K is the base-case pre-seed**, not the comfort option. Everything below this point is the cost detail that backs these figures.

## 18.2 Phase 1 (mo 0–3): prove the wedge

Two people, no revenue. The goal is a first paid pilot, one or two design partners, a labeled golden set, and the security packet. Cost is mostly founder and domain-lead time plus the front-loaded compliance setup.

**Staff**

| Role | Count | Fully-loaded monthly |
|---|---|---|
| Founder (conservative draw; ~₹600–800K/mo market value) | 1 | ₹300–400K (~\$3,160–4,200) |
| U.S.-experienced RCM/AR domain lead (often a co-founder on equity) | 1 | ₹250–350K (~\$2,630–3,680) |
| **Staff subtotal** | **2** | **~₹650K (~\$6,840)** |

**Software & infrastructure (~\$1–2K/mo):** cloud in a BAA region, LLM API at development volume, Stedi sandbox, Vanta/Drata for SOC 2 evidence, GitHub/CI, Google Workspace, and 1–2 VDI seats. Unit prices are in §18.5.

**One-time setup (~\$25–55K, front-loaded):**

| Item | One-time cost |
|---|---|
| Developer / staff laptops (2–3, modest spec; VDI offloads compute) | ~₹60–120K each (~\$630–1,265) |
| U.S. entity formation + registered agent + legal (BAA + contract templates) | ~\$3,000–10,000 (verified: Stripe-Atlas-style formation ~\$500–800; attorney-drafted BAA \$500–3K; the band's upper half buys specialist healthcare counsel — advisable) |
| SOC 2 Type II readiness + first audit kickoff (3–12 mo observation — 3–6 common for a first report; start now) | ~\$15,000–40,000 audit-side (realistic first-year all-in incl. compliance platform + readiness is ~\$30–60K; the delta sits in the monthly compliance line) |
| Domain, branding, basic website | ~\$1,000–3,000 |

**Compliance & insurance (~\$2–3K/mo):** SOC 2 tooling and readiness, plus E&O and cyber insurance started early (a revenue gate, §12).

**Phase 1 total:** ~\$11–14K/mo run-rate (the top of the range assumes usage-based LLM/clearinghouse spend plus ~10% contingency above the itemized lines); about \$33–42K over three months, plus ~\$25–55K one-time setup, so the Phase 1 cash need is roughly **\$60–95K**. The full pre-revenue requirement to a first pilot, which runs into Phase 2, is in §18.7.

## 18.3 Phase 2 (mo 3–9): design partners live

The first engineers and HITL reviewers come on, pilots go into production, and the U.S. go-to-market presence begins.

**Staff (cumulative ~6)**

| Role | Count | Fully-loaded monthly |
|---|---|---|
| Founder + domain lead (continued) | 2 | ~₹650K (~\$6,840) |
| Senior backend / integration (EDI/FHIR) engineer | 1 | ₹230–380K (~\$2,400–4,000) |
| Mid AI/ML engineer | 1 | ₹150–290K (~\$1,580–3,050) |
| Certified coder / AR HITL reviewer | 2 | ₹30–58K each (~\$315–610) |
| **Staff subtotal** | **~6** | **~₹1.26M (~\$13,260)** |

**Software & infrastructure (~\$3–4K/mo):** cloud and LLM at pilot volume, clearinghouse (Stedi plus Availity), 4–6 VDI seats, document AI/OCR, and observability. Unit prices are in §18.5.

**Compliance run-rate (~\$2.5–3K/mo):** SOC 2 Type II observation ongoing. **One-time within Phase 2:** an initial penetration test ~\$5–15K (once, late Phase 1 or early Phase 2 — counted once in the six-month total, not amortized).

**U.S. GTM (~\$5–6K/mo):** a fractional U.S. sales/advisor begins (~\$60–150K/yr equivalent, part-time early).

A salary-band note (verified July 2026): the senior-engineer band (₹230–380K/mo) is a deliberate P75–P90 premium vs the ~₹90–115K/mo Chennai senior-SWE market average — priced to compete with product companies (PayPal, Freshworks) for integration talent; competent seniors are hireable at ₹150–250K/mo loaded. The coder/AR and customer-success bands match market. Add ~1 month's salary per engineering hire for recruiting.

**Phase 2 total:** ~\$25–34K/mo run-rate (top of range = usage-based spend + ~10% contingency above the itemized lines); about **\$150–205K** over six months. **Bridge (months 9–12):** the phase tables skip from month 9 to month 12 — budget ~\$25–40K/mo (~\$75–120K) at the Phase-2 configuration for the quarter in which pilots convert to paid.

## 18.4 Phase 3 (mo 12–18+): productized and scaling

The team and the HITL pool scale with claim volume, and the U.S. GTM org is built out. Headcount and burn grow with revenue.

**Staff (cumulative ~10–14, scaling)**

| Role | Count | Fully-loaded monthly |
|---|---|---|
| Founder + domain lead | 2 | ~₹550–750K (~\$5,790–7,890) |
| Senior backend / integration engineer | 2 | ₹460–760K (~\$4,840–8,000) |
| Mid AI/ML engineer | 1 | ₹150–290K (~\$1,580–3,050) |
| Customer success | 1 | ₹60–120K (~\$630–1,260) |
| Certified coder / AR HITL reviewer (scales with volume) | 4–8 | ₹120–464K (~\$1,260–4,880) |
| **Staff subtotal** | **~10–14** | **~₹1.9–2.4M (~\$20–25K)** *(floor assumes ~6 HITL and mid-band engineering salaries; the arithmetic minimum of the line items is ~₹1.34M ≈ \$14.1K)* |

**Software & infrastructure (~\$6–10K/mo):** production cloud, LLM and clearinghouse at volume, and 8–14 VDI seats. Unit prices are in §18.5.

**Compliance + one-time (~\$4–5K/mo):** SOC 2 annual re-attestation, annual pen test, and insurance; HITRUST r2 (~\$60K+ one-time) when pursued as a differentiator.

**U.S. GTM (~\$10–40K/mo, scaling):** U.S. sales plus customer success, built out as ARR grows.

**Phase 3 total:** enters at ~\$50–70K/mo (months 12–18) and rises to ~\$83–117K/mo at full Year-3 volume — annualizing to **~\$1.0–1.4M in Y3** (the flat "\$50–110K/mo" phrasing previously used doesn't produce that annual figure; it is a ramp).

## 18.5 Unit-cost reference (software, infrastructure, and compliance)

The per-item prices the phase figures above draw from. Usage-based lines (LLM, clearinghouse, telephony) are modeled per-transaction in §5.6 and §7.2.1; the monthly figures are typical at early-pilot volume and scale with claims.

| Item | What it covers | Typical monthly (early → scaling) |
|---|---|---|
| Cloud (AWS/Azure/GCP, BAA region) | Compute, Postgres, object storage, networking; PHI at rest in a U.S. region | ~\$300–1,500 |
| VDI / DaaS (Amazon WorkSpaces / Azure Virtual Desktop) | Zero-local-data access for offshore staff (§6.6.1), per seat | ~\$25–40 per seat |
| LLM API (Claude or equivalent) | Per-claim reasoning; ~\$0.02–0.05 per claim with caching | ~\$200–2,000 |
| Clearinghouse (Stedi, then Availity) | EDI transactions; 837 alone ~\$0.30 low-volume → ~\$0.10 at scale; full claim cycle (270/271 + 837 + 276/277 + 835) ~\$0.34–1.10 (§7.2.1) | ~\$100–1,500 |
| Voice stack, all-in — telephony + STT + TTS + LLM + platform fee (voice wedge only) | ~\$0.13–0.33 per call-minute (§8.6) | ~\$0–2,000 |
| Document AI / OCR | Parsing EOBs and denial letters | ~\$50–300 |
| Compliance automation (Vanta / Drata) | SOC 2 evidence collection and monitoring | ~\$700–2,000 (≈\$8–25K/yr) |
| Observability, logging, error tracking | Audit trail, drift alarms | ~\$100–500 |
| Source control + CI (GitHub or equivalent) | Build/test pipeline | ~\$50–300 |
| Email, productivity, CRM | Google Workspace, a lightweight CRM | ~\$150–600 |

**Compliance and insurance run-rate (annual):** SOC 2 Type II ~\$15–40K/yr audit-side (~\$30–60K first-year all-in with platform + readiness; renewals ~60–80% of year one); penetration test ~\$5–15K/yr (recurs annually, additive to SOC 2); E&O + cyber insurance ~\$3–15K/yr, weighted toward \$6–15K once clients mandate \$2–5M limits (a revenue gate, §12); **HITRUST — budget e1 (~\$35–90K) as the realistic year-1–2 milestone; i1 (~\$80–220K) and r2 (first-cycle total commonly \$200–500K+, a 2-year certification with interim assessment) are later-stage differentiators — the earlier "~\$60K+" line understated r2 by 3–5x**; per-payer EDI/ERA enrollment is mostly staff time, but budget for occasional per-form or wet-signature handling (the long pole, §7.2.1).

**Previously missing line items (added July 2026):** U.S. travel — HBMA/HFMA conferences, design-partner and security-review visits — ~\$12–20K/yr from Phase 2; U.S. contract/legal run-rate for MSA/BAA negotiation ~\$10–25K/yr from the first enterprise deal; India entity statutory/accounting (CA, GST/TDS filings, EPF administration) ~₹25–40K/mo (~\$260–420); recruiting ~1 month's salary per engineering hire.

## 18.6 All-in roll-up (calendar-year, reconciles to §11.4)

All-in burn is the India payroll core plus the U.S.-facing sales/advisor, compliance, and tooling stack. The U.S./compliance layer is priced in USD and grows fastest: offshore payroll is roughly a third to a half of the all-in, so the all-in runs well above the payroll line.

| Phase | Team | Monthly all-in run-rate |
|---|---|---|
| Phase 1 (mo 0–3) | 2 | ~\$11–14K |
| Phase 2 (mo 3–9) | ~6 | ~\$25–34K |
| Bridge (mo 9–12) | ~6 | ~\$25–40K |
| Phase 3 (mo 12–18+) | ~10–14, growing with volume | ~\$50–70K entering → ~\$83–117K at full volume |

Calendar-year all-in, blending phases and one-time setup (recomputed July 2026 — the earlier **Y1 ~\$230–320K / Y2 ~\$480–660K** figures omitted the months-9–12 bridge and sat below Phase 3's own floor): **Y1 ~\$280–400K, Y2 ~\$600–850K, Y3 ~\$1.0–1.4M** as the U.S. GTM org and the HITL pool scale with claim volume. Working capital matters for timing: SOC 2 Type II, insurance, and per-payer enrollments all spend cash before the first revenue, so the pre-revenue requirement is higher than the payroll line implies.

## 18.7 The minimum viable budget

Two honest versions of the minimum, because the arithmetic must reconcile (the earlier "\$11–14K/mo × 9 ≈ \$130–170K → \$160–210K" headline matched neither path — 9 × \$11–14K is \$99–126K):

- **Lean wedge-proof (2 people, engineers deferred):** ~\$11–14K/month all-in for nine months ≈ **\$99–126K** operating burn, plus ~\$25–55K one-time working capital (SOC 2, insurance, entity/legal) ≈ **~\$125–180K pre-revenue**. This buys a demo, a labeled golden set, and a signed LOI — *not* two paying in-production billers: it defers the Phase-2 engineers and HITL and pushes "design partners live" past month 9. A friends-and-angel note of \$150–200K covers this scenario.
- **The plan as written (Phases 1–2 staffed):** \$33–42K (Phase 1) + \$150–205K (Phase 2) + \$25–55K one-time ≈ **~\$210–300K to month 9**, plus ~\$75–120K for the months-9–12 bridge during which pilots convert to paid — so the true cost of reaching the month-12 two-paying-billers gate is **~\$285–420K**. This is why **\$250–350K is the base-case pre-seed** and \$150–200K is strictly the wedge-proof scenario (§18.1).

After that, the venture is designed to fund itself from paying billers and to raise institutional capital only to accelerate (§15.5).
