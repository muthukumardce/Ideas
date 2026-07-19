# Venture budget and capital requirement

*Companion budget to the report “Competing in U.S. Healthcare RCM” (`competing-in-us-healthcare-rcm.md`). Section references such as §5.6, §11.4, or §15 point to that report; §18.x references are within this document. Figures are illustrative as of June 2026, on a Chennai cost base at about ₹95/USD.*

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
| Series A | **~\$10–20M** | At \$2–3M ARR | Multi-specialty expansion, enterprise GTM, category build | Scale (comparable to the \$11–21M Series A rounds peers raised, §9) |

Use of the pre-seed / angel tranche (the first round only), approximately:
- ~55–65%: people, the founder draw plus the domain co-founder (staff is detailed per phase, §18.2–§18.4).
- ~15–20%: compliance and legal (SOC 2 Type II, U.S. entity, BAA, insurance). This is front-loaded and spends before revenue (§18.2, §18.5).
- ~10–15%: software, infrastructure, LLM, and clearinghouse (§18.5).
- ~5–10%: working-capital buffer.

The single headline number: **~\$150–250K** takes the venture from zero to a fundable seed. The lean floor is ~\$150–200K (§18.7); a more comfortable ~\$250–350K de-risks the SOC 2 timeline and the first engineering hire. Everything below this point is the cost detail that backs these figures.

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
| Developer / staff laptops (2–3, modest spec; VDI offloads compute) | ~₹60–120K each (~\$650–1,300) |
| U.S. entity formation + registered agent + legal (BAA + contract templates) | ~\$3,000–10,000 |
| SOC 2 Type II readiness + first audit kickoff (6–12 mo observation; start now) | ~\$15,000–40,000 |
| Domain, branding, basic website | ~\$1,000–3,000 |

**Compliance & insurance (~\$2–3K/mo):** SOC 2 tooling and readiness, plus E&O and cyber insurance started early (a revenue gate, §12).

**Phase 1 total:** ~\$11–14K/mo run-rate; about \$33–42K over three months, plus ~\$25–55K one-time setup, so the Phase 1 cash need is roughly **\$60–95K**. The full pre-revenue requirement to a first pilot, which runs into Phase 2, is in §18.7.

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

**Compliance + one-time (~\$2.5–3K/mo):** SOC 2 Type II observation ongoing, plus an initial penetration test ~\$5–15K (if not done late in Phase 1).

**U.S. GTM (~\$5–6K/mo):** a fractional U.S. sales/advisor begins (~\$60–150K/yr equivalent, part-time early).

**Phase 2 total:** ~\$25–34K/mo run-rate; about **\$150–205K** over six months.

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
| **Staff subtotal** | **~10–14** | **~₹1.9–2.4M (~\$20–25K)** |

**Software & infrastructure (~\$6–10K/mo):** production cloud, LLM and clearinghouse at volume, and 8–14 VDI seats. Unit prices are in §18.5.

**Compliance + one-time (~\$4–5K/mo):** SOC 2 annual re-attestation, annual pen test, and insurance; HITRUST r2 (~\$60K+ one-time) when pursued as a differentiator.

**U.S. GTM (~\$10–40K/mo, scaling):** U.S. sales plus customer success, built out as ARR grows.

**Phase 3 total:** ~\$50–110K/mo run-rate, annualizing to **~\$1.0–1.4M** at full Year-3 volume.

## 18.5 Unit-cost reference (software, infrastructure, and compliance)

The per-item prices the phase figures above draw from. Usage-based lines (LLM, clearinghouse, telephony) are modeled per-transaction in §5.6 and §7.2.1; the monthly figures are typical at early-pilot volume and scale with claims.

| Item | What it covers | Typical monthly (early → scaling) |
|---|---|---|
| Cloud (AWS/Azure/GCP, BAA region) | Compute, Postgres, object storage, networking; PHI at rest in a U.S. region | ~\$300–1,500 |
| VDI / DaaS (Amazon WorkSpaces / Azure Virtual Desktop) | Zero-local-data access for offshore staff (§6.6.1), per seat | ~\$25–40 per seat |
| LLM API (Claude or equivalent) | Per-claim reasoning; ~\$0.02–0.05 per claim with caching | ~\$200–2,000 |
| Clearinghouse (Stedi, then Availity) | EDI transactions; ~\$0.30–0.50 per claim at mid volume (§7.2.1) | ~\$100–1,500 |
| Telephony + STT + TTS (voice wedge only) | ~\$0.20–0.33 per call-minute (§8.6) | ~\$0–2,000 |
| Document AI / OCR | Parsing EOBs and denial letters | ~\$50–300 |
| Compliance automation (Vanta / Drata) | SOC 2 evidence collection and monitoring | ~\$700–2,000 (≈\$8–25K/yr) |
| Observability, logging, error tracking | Audit trail, drift alarms | ~\$100–500 |
| Source control + CI (GitHub or equivalent) | Build/test pipeline | ~\$50–300 |
| Email, productivity, CRM | Google Workspace, a lightweight CRM | ~\$150–600 |

**Compliance and insurance run-rate (annual):** SOC 2 Type II ~\$15–40K/yr; penetration test ~\$5–15K/yr; E&O + cyber insurance ~\$3–15K/yr (a revenue gate, §12); HITRUST ~\$60K+ when pursued; per-payer EDI/ERA enrollment is mostly staff time, but budget for occasional per-form or wet-signature handling (the long pole, §7.2.1).

## 18.6 All-in roll-up (calendar-year, reconciles to §11.4)

All-in burn is the India payroll core plus the U.S.-facing sales/advisor, compliance, and tooling stack. The U.S. layer is priced in USD and dominates: the offshore salaries are a small share of the all-in, so the all-in runs well above the payroll line.

| Phase | Team | Monthly all-in run-rate |
|---|---|---|
| Phase 1 (mo 0–3) | 2 | ~\$11–14K |
| Phase 2 (mo 3–9) | ~6 | ~\$25–34K |
| Phase 3 (mo 12–18+) | ~10–14, growing with volume | ~\$50–110K |

Calendar-year all-in, blending phases and one-time setup: **Y1 ~\$230–320K, Y2 ~\$480–660K, Y3 ~\$1.0–1.4M** as the U.S. GTM org and the HITL pool scale with claim volume. Working capital matters for timing: SOC 2 Type II, insurance, and per-payer enrollments all spend cash before the first revenue, so the pre-revenue requirement is higher than the payroll line implies.

## 18.7 The minimum viable budget

The cheapest credible path to a first paid pilot is Phase 1 run lean: the founder plus the domain co-founder, on roughly **\$11–14K/month all-in** for the first nine months, about **\$130–170K** of operating burn. Add ~\$25–55K of working capital for the SOC 2 Type II audit, insurance, and entity/legal setup that must precede the first enterprise sale, so the realistic pre-revenue requirement is about **\$160–210K**. A friends-and-angel note of \$150–200K covers the operating burn, with the working capital topped up as the security review approaches. After that, the venture is designed to fund itself from paying billers and to raise institutional capital only to accelerate (§15.5).
