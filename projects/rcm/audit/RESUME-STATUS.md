# RCM doc audit — COMPLETED 2026-07-20

The task finished. Both docs were fact-audited and updated in place:

- `projects/rcm/docs/competing-in-us-healthcare-rcm.md` — ~95 corrections applied (verified facts, attributions, internal-consistency fixes) plus a new **"Addendum (July 2026): fact-audit, market refresh, and reviewer's assessment"** section before Appendix A.
- `projects/rcm/docs/rcm-venture-budget.md` — arithmetic reconciled (§18.7 minimum-viable budget, §18.6 roll-ups, months-9–12 bridge), HITRUST/SOC-2/insurance costs corrected, missing line items added; base-case pre-seed restated at ~$250–350K, ~$285–420K to the month-12 gate.

Audit provenance (kept for reference):
- `workflow-journal-snapshot.jsonl` — mid-run snapshot of agent results (superseded by the live journal).
- Full journal: `/Users/mk/.claude/projects/-Users-mk-Projects-Ideas/15707c96-9b3b-4672-a3b5-df5fadca84e9/subagents/workflows/wf_f2dfef61-233/journal.jsonl` (94 agents, 702 claims extracted, 673 verified, 6 wrong / 11 outdated / ~74 imprecise; all 6 rechecks confirmed; 5 fresh sweeps; 3 critiques).
- `rcm-doc-audit-workflow.js` — the workflow script used.

This folder can be deleted once the revision is accepted; the docs stand on their own.
