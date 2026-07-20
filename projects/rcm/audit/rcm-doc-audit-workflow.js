export const meta = {
  name: 'rcm-doc-audit',
  description: 'Verify factual claims in the RCM research report, sweep for mid-2026 developments, critique strategy and budget',
  phases: [
    { title: 'Extract', detail: 'pull verifiable claims from doc chunks' },
    { title: 'Verify', detail: 'web-verify claim batches' },
    { title: 'Recheck', detail: 'adversarially confirm proposed corrections' },
    { title: 'Fresh', detail: 'Jan–Jul 2026 developments sweep' },
    { title: 'Critique', detail: 'strategy, budget, and arithmetic soundness' },
  ],
}

const DOC = '/Users/mk/Projects/Ideas/projects/rcm/docs/competing-in-us-healthcare-rcm.md'
const BUDGET = '/Users/mk/Projects/Ideas/projects/rcm/docs/rcm-venture-budget.md'
const TODAY = '2026-07-19'

const CLAIMS_SCHEMA = {
  type: 'object', required: ['claims'],
  properties: {
    claims: {
      type: 'array',
      items: {
        type: 'object', required: ['line', 'quote', 'claim', 'topic', 'priority'],
        properties: {
          line: { type: 'integer', description: '1-indexed line number in the file where the claim appears' },
          quote: { type: 'string', description: 'verbatim substring from the file, max 120 chars, enough to locate the claim' },
          claim: { type: 'string', description: 'the factual claim restated precisely, self-contained' },
          topic: { type: 'string', enum: ['market-size', 'denial-stats', 'funding-ma', 'regulatory', 'technical', 'pricing-economics', 'ai-landscape', 'company-facts', 'india-costs', 'patient-pay', 'other'] },
          priority: { type: 'string', enum: ['high', 'medium', 'low'], description: 'high = central number/fact or likely stale; low = trivial/tangential' }
        }
      }
    }
  }
}

const VERDICTS_SCHEMA = {
  type: 'object', required: ['verdicts'],
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object', required: ['line', 'quote', 'verdict', 'explanation'],
        properties: {
          line: { type: 'integer' },
          quote: { type: 'string' },
          verdict: { type: 'string', enum: ['correct', 'wrong', 'outdated', 'imprecise', 'unverifiable'] },
          explanation: { type: 'string', description: 'what you found, with the key evidence' },
          correction: { type: 'string', description: 'for wrong/outdated/imprecise: the precise corrected statement with numbers and as-of dates' },
          sources: { type: 'array', items: { type: 'string' }, description: 'URLs of the sources used' }
        }
      }
    }
  }
}

const RECHECK_SCHEMA = {
  type: 'object', required: ['confirmed', 'notes'],
  properties: {
    confirmed: { type: 'boolean', description: 'true if the proposed correction survives independent verification' },
    final_text: { type: 'string', description: 'the correction as it should read, possibly revised' },
    notes: { type: 'string' },
    sources: { type: 'array', items: { type: 'string' } }
  }
}

const FRESH_SCHEMA = {
  type: 'object', required: ['findings'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object', required: ['headline', 'detail', 'relevance'],
        properties: {
          headline: { type: 'string' },
          detail: { type: 'string', description: 'specifics: numbers, dates, names' },
          date: { type: 'string', description: 'when it happened, e.g. 2026-03' },
          relevance: { type: 'string', description: 'which section(s) of the doc this affects and how' },
          sources: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
}

const CRITIQUE_SCHEMA = {
  type: 'object', required: ['issues'],
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object', required: ['section', 'issue', 'severity', 'suggestion'],
        properties: {
          section: { type: 'string', description: 'section number/name or line reference' },
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
          suggestion: { type: 'string', description: 'concretely how the doc should change' }
        }
      }
    },
    overall_assessment: { type: 'string' }
  }
}

const extractPrompt = (file, start, end) => 'You are auditing a research report on US healthcare Revenue Cycle Management (RCM) for factual accuracy. Read the file ' + file + ' from line ' + start + ' to line ' + end + ' using the Read tool (offset=' + start + ', limit=' + (end - start + 1) + ').\n\nExtract EVERY externally verifiable factual claim in that range: statistics, market sizes, growth rates, dollar amounts, funding rounds, M&A deals (acquirer/target/price/date), dates, company facts (headcount, products, launches), regulatory facts and statuses (rules, deadlines, thresholds), technical specifications (code counts, standards, formats), pricing/cost benchmarks, and named-source citations (e.g. "KFF says X", "MGMA puts Y at Z").\n\nFor each claim record: the exact line number (from the cat -n output), a verbatim quote of up to 120 characters (an exact substring of the line, sufficient to locate it), the claim restated precisely and self-contained (include the surrounding context needed to verify it, e.g. scope: US vs global, year), a topic from the enum, and priority (high = a number/fact central to the report\u2019s argument, or one you suspect is stale or wrong; medium = supporting facts; low = trivial). Skip pure opinions, strategy recommendations, and internal cross-references. Do NOT skip claims because they seem obviously right. Be exhaustive \u2014 a dense line may contain 3-4 distinct claims.'

const verifyPrompt = (b) => 'Today is ' + TODAY + '. You are fact-checking claims from a research report on US healthcare RCM written in June 2026. For each claim below, verify it against authoritative, current sources. Load the WebSearch and WebFetch tools via ToolSearch (query "select:WebSearch,WebFetch") and use them extensively \u2014 prefer primary sources: KFF, CMS, HHS/OCR, company press releases and SEC filings, CAQH Index, MGMA, AMA, X12/WEDI, reputable trade press (Healthcare Dive, Fierce Healthcare, HFMA, Becker\u2019s), and market-research firm pages.\n\nVerdicts:\n- correct: confirmed by good sources (allow reasonable rounding).\n- wrong: contradicted by authoritative sources \u2014 only use when confident; different market-research firms legitimately disagree on market sizes, so a differing estimate from another firm does NOT make a claim wrong if the cited firm/scope matches.\n- outdated: was true when written (June 2026 or earlier) but superseded since, or a newer data release exists.\n- imprecise: directionally right but the number/attribution/scope is off in a way worth fixing.\n- unverifiable: cannot be confirmed or refuted with reasonable effort.\nFor wrong/outdated/imprecise, write a precise correction: the corrected statement with exact numbers, as-of dates, and proper attribution. Always list source URLs.\n\nSpend real effort on high-priority claims (multiple searches, cross-check 2+ sources); for low-priority ones one good check suffices. Verify EVERY claim in the list and return one verdict per claim, preserving the given line and quote exactly.\n\nClaims (JSON):\n' + JSON.stringify(b.claims, null, 1)

const recheckPrompt = (v) => 'Today is ' + TODAY + '. A fact-checker reviewed a claim in an RCM industry report and proposed a correction. Your job is to independently verify the correction \u2014 actively try to REFUTE it. Load WebSearch and WebFetch via ToolSearch (query "select:WebSearch,WebFetch") and check primary sources yourself. Do not trust the first checker\u2019s sources; find your own.\n\nOriginal claim in the doc (line ' + v.line + '): "' + (v.quote || '') + '"\nRestated: ' + (v.explanation || '') + '\nChecker\u2019s verdict: ' + v.verdict + '\nProposed correction: ' + (v.correction || '') + '\n\nReturn confirmed=true only if the correction is right and the original doc text really needs changing. If the original was actually fine (e.g. within reasonable rounding, or the checker misread scope \u2014 US vs global, software vs services), return confirmed=false. If the correction is directionally right but the numbers need revising, return confirmed=true with the revised text in final_text. final_text should be publication-ready phrasing with as-of dates and attribution.'

const FRESH_ANGLES = [
  { key: 'funding-ma', prompt: 'Sweep for US healthcare RCM and revenue-cycle-AI funding rounds, M&A, IPOs, take-privates, and major partnerships from January 2026 through July 2026 (and late-2025 events a June-2026 report might have missed). Companies to check explicitly: AKASA, Adonis, Infinitus, CodaMetrix, SuperDial, Candid Health, Anterior, SmarterDx, Thoughtful AI, Smarter Technologies, Access Healthcare, R1 RCM, Waystar, FinThrive, Availity, Ensemble Health Partners, Omega Healthcare, GeBBS, AGS Health, Med-Metrix, Knack RCM, Cair Health, LunaBill, Stedi, Infinx, CareCloud, TruBridge, athenahealth, Tebra, Candor Health, Hippocratic AI, Abridge, Ambience. Also: any new entrants in denial management, prior auth, or AR-calling AI that raised seed/Series A in 2026. For each finding give deal size, date, parties, and which doc section it affects (the doc profiles the competitive landscape in \u00a74.3/\u00a79 and funding norms in \u00a79.1).' },
  { key: 'regulatory', prompt: 'Sweep for US healthcare billing/RCM regulatory developments as of July 2026, especially changes since roughly May 2026 and anything a June-2026 report may have gotten wrong. Check specifically: (1) status of the HHS OCR HIPAA Security Rule NPRM (proposed Dec 2024/Jan 2025) \u2014 finalized, withdrawn, or still pending as of July 2026? (2) CMS Interoperability and Prior Authorization Final Rule CMS-0057-F \u2014 current compliance deadlines (2026/2027) and any delays; (3) No Surprises Act / good-faith-estimate enforcement updates; (4) state laws regulating AI in payer claim/prior-auth denials (California SB 1120, similar 2025-2026 state laws); (5) Medicare appeals: 2026 amount-in-controversy threshold for ALJ hearings (exact dollar figure); (6) CMS WISeR model or other Medicare prior-auth expansions; (7) ICD-11 US transition status; (8) India DPDP Act implementation status as it affects offshore processing of US PHI; (9) any 2026 HHS/OCR enforcement or policy changes affecting offshore BAA subcontractors. Give exact dates, citations, and effective dates.' },
  { key: 'product-landscape', prompt: 'Sweep the agentic-AI-in-RCM product landscape as of July 2026. Verify or refute these specific claims from a June-2026 report, then find what it missed: (1) R1 RCM launched "Phare OS" in October 2025, an agentic revenue operating system with modules Phare Access/Phare Claim/Phare Flow, 1000+ payer connections, 670M+ annual encounters, and agreed to acquire UK-based Phare Health for AI inpatient coding \u2014 is ALL of this real? R1 also has an AI lab (R37, with Palantir) \u2014 check what R1 actually shipped in 2025-2026; (2) Waystar acquired Iodine Software for $1.25B (announced July 2025, closed Oct 2025) and launched agentic AI in January 2026 targeting a ~$100B RCM labor market \u2014 verify names and details (e.g. AltitudeAI); (3) FinThrive unveiled an agentic-AI RCM platform with 50+ use cases on a "Fusion" architecture at HIMSS 2026 \u2014 verify; (4) Infinitus: ~4M payer calls completed, current product line; (5) what Epic, Oracle Health, athenahealth, Salesforce, Microsoft, Google, Anthropic, and OpenAI shipped for RCM/revenue-cycle or healthcare agents in 2025-2026; (6) Smarter Technologies (New Mountain Capital rollup of Access Healthcare + Thoughtful.ai + SmarterDx, ~$6B): current status, any 2026 news. Give dates and sources.' },
  { key: 'denial-data', prompt: 'Sweep for the latest US claim-denial and payer-behavior data as of July 2026, to update a June-2026 report. Check: (1) Experian Health State of Claims (2025 edition and any 2026 release) \u2014 key stats: share of providers with denial rates >10%, share saying denials rising; (2) KFF analysis of HealthCare.gov marketplace claim denials \u2014 latest year available (2024 data released early 2026?), in-network and out-of-network denial rates, appeal rate (<1%?), overturn rates; (3) latest initial-denial-rate benchmarks (Change/Optum, Kodiak Solutions, Crowe, Premier, AHA surveys) \u2014 the doc cites 11.81% initial denial rate for 2024; (4) prior-auth denial overturn rates (the doc claims >80% of prior-auth appeals succeed \u2014 verify the source, likely KFF Medicare Advantage data); (5) status of algorithmic-denial litigation: Cigna PxDx class action, UnitedHealth nH Predict/NaviHealth lawsuit, Humana \u2014 rulings or settlements through July 2026; (6) any major payer announcements on AI claim review 2026; (7) the claims that ~65% of denied claims are never resubmitted and ~86% of denials are avoidable (Change Healthcare) \u2014 verify provenance and whether newer figures exist; (8) commercial underpayment prevalence figures attributed to MGMA (~7-11%). Give exact figures, publication dates, URLs.' },
  { key: 'india-costs', prompt: 'Verify India-side cost assumptions in a June-2026 venture budget for a Chennai-based healthcare-RCM AI startup, as of July 2026: (1) USD/INR exchange rate now and the mid-2026 range \u2014 the doc assumes \u20b995/USD, is that right? (2) Chennai fully-loaded monthly salary benchmarks: senior backend/integration engineer (\u20b9230-380K/mo claimed), mid-level AI/ML engineer (\u20b9150-290K/mo), certified medical coder / AR analyst (\u20b930-58K/mo), customer success (\u20b960-120K/mo) \u2014 sanity-check against Indian salary data (Levels.fyi India, Glassdoor, AmbitionBox, naukri, industry reports); (3) SOC 2 Type II total cost for a small startup (audit + readiness): claimed $15-40K \u2014 current market (Vanta/Drata/Secureframe pricing, audit firm fees); (4) HITRUST r2 certification cost (claimed ~$60K+); (5) Amazon WorkSpaces / Azure Virtual Desktop per-seat monthly cost (claimed $25-40); (6) E&O + cyber insurance for a small health-tech startup handling PHI (claimed $3-15K/yr); (7) US entity formation + legal for BAA/contract templates ($3-10K claimed); (8) penetration test cost ($5-15K); (9) Indian RCM/BPO industry news Jan-Jul 2026 (Omega Healthcare, Access Healthcare/Smarter, acquisitions of Indian RCM shops). Give current figures with sources.' },
]

const CRITIQUES = [
  { key: 'strategy', prompt: 'You are a skeptical healthcare-AI operator and investor reviewing a strategy report. Read the ENTIRE file ' + DOC + ' (it is ~1670 lines; read it in chunks with the Read tool). Then critique it adversarially as of July 2026: (1) Is the Path C recommendation (sell AI tooling to small/mid billing companies) still sound given mid-2026 market conditions? Steelman the counter-case. (2) Is the \u00a713 wedge logic (denials/underpayments first) right, or are those lanes now saturated? (3) Are the kill-criteria and probability framing honest or theater? (4) What does the report systematically overweight or underweight (e.g. does it underrate EHR-native distribution, overrate the India cost advantage, ignore the data-access problem for underpayment detection \u2014 you need the payer contracts and 835s, which the biller controls)? (5) Internal contradictions between sections. (6) What material topics are missing entirely? Use WebSearch (load via ToolSearch "select:WebSearch,WebFetch") where a claim about the market needs checking. Report concrete issues tied to sections, each with a severity and a specific suggested change. Do not pad: only issues that would change a reader\u2019s decision or materially improve the doc.' },
  { key: 'budget', prompt: 'You are a pragmatic startup CFO. Read ' + BUDGET + ' fully, and the sections of ' + DOC + ' it references (\u00a75.6, \u00a711.4, \u00a715, \u00a77.2.1, \u00a78.6 \u2014 find them with Grep and read those ranges). Audit the budget: (1) ARITHMETIC: recompute every roll-up \u2014 e.g. \u00a718.7 claims $11-14K/mo for 9 months \u2248 $130-170K of operating burn (9\u00d711=99, 9\u00d714=126 \u2014 does it reconcile or not? check whether phase-2 run-rate is meant); check \u00a718.6 Y1-Y3 roll-ups against the phase run-rates; check the INR\u2192USD conversions at \u20b995/USD; check staff subtotals against the line items. (2) REALISM: is $150-250K pre-seed enough to reach 2 paying billers given the stated Phase 1+2 run-rates plus one-time costs? What is missing from the budget entirely (payroll taxes/statutory costs in India, US payroll for the fractional seller, travel to US conferences, legal for enterprise contract negotiation, churn/rebuild buffer)? (3) CONSISTENCY with the main report\u2019s staged burn \u00a711.4. Report each issue with severity and a concrete fix (corrected number or added line item).' },
  { key: 'consistency', prompt: 'You are a meticulous technical editor. Read the ENTIRE file ' + DOC + ' in chunks. Hunt ONLY for internal problems (no web research needed): (1) numbers that contradict each other across sections (e.g. a stat cited with different values in two places, funding figures that differ between \u00a71, \u00a74.3, \u00a79 and Appendix B); (2) arithmetic errors inside tables or examples; (3) cross-references pointing to the wrong section (\u00a7X references that do not match the actual section content); (4) reference markers [n] used inconsistently or duplicated for different sources; (5) date inconsistencies (e.g. events dated after June 2026 in a June-2026 doc, or tense errors); (6) claims in the executive summary or \u00a70 not supported by the body. Report each with line numbers and exact quotes of both sides of the contradiction.' },
]

// ---- Extract (barrier: dedupe/bucketing needs ALL chunks) ----
phase('Extract')
const chunkRanges = [[1, 300], [290, 590], [580, 880], [870, 1170], [1160, 1460], [1450, 1668]]
const extractThunks = chunkRanges.map(r => () =>
  agent(extractPrompt(DOC, r[0], r[1]), { label: 'extract:main-' + r[0] + '-' + r[1], phase: 'Extract', schema: CLAIMS_SCHEMA }))
extractThunks.push(() =>
  agent(extractPrompt(BUDGET, 1, 141) + '\n\nNote: this is the companion BUDGET doc; prefix every quote-context mentally with "budget doc". Use topic "india-costs" for cost/salary/tooling figures.', { label: 'extract:budget', phase: 'Extract', schema: CLAIMS_SCHEMA }))
const extracted = await parallel(extractThunks)

const seen = new Set()
const byTopic = {}
let total = 0
for (let i = 0; i < extracted.length; i++) {
  const r = extracted[i]
  if (!r || !r.claims) continue
  const fromBudget = i === extractThunks.length - 1
  for (const c of r.claims) {
    const k = (c.quote || '').slice(0, 80).toLowerCase()
    if (!k || seen.has(k)) continue
    seen.add(k)
    c.file = fromBudget ? 'budget' : 'main'
    const t = c.topic || 'other'
    if (!byTopic[t]) byTopic[t] = []
    byTopic[t].push(c)
    total++
  }
}
const batches = []
for (const topic of Object.keys(byTopic)) {
  const claims = byTopic[topic]
  for (let i = 0; i < claims.length; i += 10) {
    batches.push({ topic: topic, idx: Math.floor(i / 10), claims: claims.slice(i, i + 10) })
  }
}
log(total + ' unique claims in ' + Object.keys(byTopic).length + ' topics -> ' + batches.length + ' verify batches')

// ---- Verify -> Recheck pipeline, with Fresh and Critique running concurrently ----
const results = await parallel([
  () => pipeline(
    batches,
    b => agent(verifyPrompt(b), { label: 'verify:' + b.topic + '-' + b.idx, phase: 'Verify', schema: VERDICTS_SCHEMA }),
    (res, b) => {
      if (!res || !res.verdicts) return res
      const flagged = res.verdicts.filter(v => (v.verdict === 'wrong' || v.verdict === 'outdated' || v.verdict === 'imprecise') && v.correction)
      if (!flagged.length) return res
      return parallel(flagged.map(v => () =>
        agent(recheckPrompt(v), { label: 'recheck:' + b.topic + '-L' + v.line, phase: 'Recheck', schema: RECHECK_SCHEMA })
          .then(chk => { v.recheck = chk; return v })
      )).then(() => res)
    }
  ),
  () => parallel(FRESH_ANGLES.map(a => () =>
    agent('Today is ' + TODAY + '. Load WebSearch and WebFetch via ToolSearch (query "select:WebSearch,WebFetch") and research thoroughly \u2014 many searches, cross-checked. ' + a.prompt + ' Return every materially relevant finding; skip fluff.', { label: 'fresh:' + a.key, phase: 'Fresh', schema: FRESH_SCHEMA }))),
  () => parallel(CRITIQUES.map(c => () =>
    agent('Today is ' + TODAY + '. ' + c.prompt, { label: 'critique:' + c.key, phase: 'Critique', schema: CRITIQUE_SCHEMA, effort: 'high' }))),
])

const verifyResults = (results[0] || []).filter(Boolean)
const freshResults = (results[1] || []).filter(Boolean)
const critiqueResults = (results[2] || []).filter(Boolean)

const allVerdicts = []
for (const r of verifyResults) { if (r && r.verdicts) allVerdicts.push(...r.verdicts) }
const flaggedCount = allVerdicts.filter(v => v.verdict !== 'correct' && v.verdict !== 'unverifiable').length
log('Verdicts: ' + allVerdicts.length + ' total, ' + flaggedCount + ' flagged for correction')

return {
  verdicts: allVerdicts,
  fresh: FRESH_ANGLES.map((a, i) => ({ angle: a.key, findings: (freshResults[i] && freshResults[i].findings) || [] })),
  critiques: CRITIQUES.map((c, i) => ({ lens: c.key, result: critiqueResults[i] || null })),
}