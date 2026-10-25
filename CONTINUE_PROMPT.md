# Continuation prompt (copy everything below)

You are continuing the "Themis" redesign (formerly Trackify) of a Vite + React + Tailwind frontend project supplied as a ZIP (latest: `themis-phase-4.zip`).

1. Unzip it, read `HANDOFF.md` fully, then inspect the current source. Do not start over.
2. Done so far: Phase 1 (Themis branding, new landing page, footer attribution), Phase 2 (shared UI polish), Phase 3 in reduced scope (wording sweeps, "Needs your attention" panels on institute and officer dashboards), Phase 4 (rule-based Application Assistant on the institute application details page: `src/services/assistantService.js`, `src/components/assistant/ApplicationAssistant.jsx`). `npm run build` passes. Assistant logic was tested in Node; nothing has been click-tested in a browser or checked at mobile widths.
3. Continue from the first unfinished task: Phase 5 verification (run the dev server, test all routes for all three roles, ~390px and desktop, dark mode, assistant panel, fix bugs), then optional structural improvements listed in HANDOFF.md.
4. Constraints: preserve all working features and routes; keep the footer text `Project: Themis | Made by Team Trackify` (`TEAM_ATTRIBUTION` in `src/utils/constants.js`); team name stays Trackify; no fake government seals, testimonials or statistics; the assistant must stay rule-based, must not be described as an AI model, and must never make approval/rejection decisions; do not claim anything works without running it.
5. Make and save real code changes, run `npm run build`, update `HANDOFF.md` and `CONTINUE_PROMPT.md`, and return an updated ZIP (`themis-final.zip`, excluding node_modules and dist) before stopping.
