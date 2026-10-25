# Themis Project Handoff

## Project overview
Themis (formerly "Trackify") is a frontend-only React app for AICTE approval workflow automation, document validation, compliance monitoring and deadline management. Goal: rebrand to Themis, give it a premium landing page and polished internal UI, and add a contextual Application Assistant. Team name stays **Trackify**. Mandatory footer text: `Project: Themis | Made by Team Trackify` (constant `TEAM_ATTRIBUTION` in `src/utils/constants.js`). Never remove it.

## Existing technology
Vite 5 + React 18, react-router-dom 6 (lazy routes in `src/routes/AppRoutes.jsx`), Tailwind 3 with CSS-variable tokens (`src/index.css`, `tailwind.config.js`, dark mode via `.dark`), framer-motion, lucide-react, recharts, react-hook-form + zod. State: React contexts (`src/context/` Auth, Data, Prefs, Toast). No backend: all data is mock (`src/data/`), persisted to LocalStorage (prefix `trackify.v1.` kept on purpose so existing saved data still loads). Auth is simulated role selection (institute / officer / admin).

## Project location and run commands
Project root = this folder. `npm install`, `npm run dev` (http://localhost:5173), `npm run build`. Node 18+.

## Completed work (Phases 0-2, Phase 3 in its reduced scope, Phase 4 assistant)
- Inspected project; no AI backend exists.
- Rebranded user-facing "Trackify" to "Themis" across `src/**` (sed), `index.html` (title, description, theme-color), `package.json` name, README, CSV export filenames (`themis-*.csv`), demo email domain (`demo.themis.test`), audit actor "Themis (system)".
- New logo mark + wordmark: `src/components/common/Logo.jsx`, `public/favicon.svg`.
- Landing page fully redesigned: `src/pages/public/Landing.jsx` (dark navy hero, serif display headline via Instrument Serif, grid/glow backdrop, floating product preview, capability marquee, bento features, 5-step workflow, benefits, role entry cards, footer). Hero copy per brief. All links are real anchors/routes; "Explore Platform" signs into the institute role as before.
- Product visual: `src/components/dashboard/HeroPreview.jsx` (restyled).
- Tokens: `font-display`, `shadow-glow` in `tailwind.config.js`; `.float-slow`, `.marquee`, `.hero-grid` in `src/index.css`.
- Footer attribution on landing, in-app shell (`AppLayout.jsx`) and login (`Login.jsx`).
- Softened "Prototype demonstration" wording to "Simulated workspace" in app banner, sidebar, login, help drawer, landing. Honesty notes (not official AICTE, simulated outcomes) are kept.

### Phase 2 (shared UI and navigation) - done
- `src/index.css`: rounder `.card` (+`.card-hover`), `.btn` min touch height 40px (32px for `-sm`) with press feedback, finer `.th`, sidebar active item gets an accent left bar, new `.page-title`.
- `Sidebar.jsx`: finer section labels, bordered footer card. `Topbar.jsx`: translucent blurred sticky bar.
- `RoleSwitcher.jsx`: amber "Demo role" button replaced by neutral "Role: X" with honest "simulated" wording.
- `AppLayout.jsx`: slimmer top notice. `PageHeader.jsx`: new title style, accent uppercase eyebrow. `MetricCard.jsx`, `Panel.jsx`: matching polish.
- Tables already scroll horizontally on small screens (`DataTable.jsx`); modals are bottom sheets on mobile; both left unchanged.

### Phase 3 (first pass)
- UI wording pass across `src/pages/**` and `src/components/**` (17 files): removed "demo" from visible titles, buttons, toasts and subtitles (e.g. "Record Approval" / "Record Rejection" instead of "... in Demo Mode", "Add user", "Reset workspace data", "Sign out"). Simulation disclaimers (SIMULATED_LABEL, "not official AICTE") were kept. Audit action names (e.g. "Demo Approval Recorded"), `src/data/*` and `DataContext.jsx` text were NOT changed.
- `InstituteDashboard.jsx`: new "Needs your attention" panel (document requests, drafts, open compliance items) computed from real scoped data.
- `StatusBadge.jsx` tracking tweak; `.input` min height 40px in `src/index.css`.

### Phase 3 continuation
- Second and third wording sweeps: "demo"/"prototype" removed from visible text in all of `src/pages/**` and `src/components/**` (login, forgot password, reports, settings, admin pages, officer pages, status badge tooltips, help drawer, wizard). Only code identifiers (`DEMO_USER_IDS`, `resetDemoData`) and the audit action names / `src/data/*` / `DataContext.jsx` text keep "demo". Simulation disclaimers remain.
- `OfficerDashboard.jsx`: "Needs your attention" panel (applications past the review window via `queueState`, high-priority applications without a reviewer).
- Scope note: Phase 3 was done as wording + shared style + attention panels. No structural redesign of the wizard, review workspace, documents or admin pages was done.

### Phase 4 (assistant) - done for application details
- `src/services/assistantService.js`: rule-based engine (`buildContext`, `answerQuestion`, `SUGGESTED_QUESTIONS`). Uses the app's status, documents (`docKey`, `validationStatus`), `complianceItems` and `deficiency`. Keyword intents: why/pending, missing documents, before submitting, compliance summary, next steps. Refuses approve/reject/prediction questions. Not an AI model, no network calls, no API keys.
- `src/components/assistant/ApplicationAssistant.jsx`: chat-style panel with the four suggested questions, free text input, clear "rule-based, not an AI model" labels. Mounted at the top of `src/pages/institute/ApplicationDetails.jsx`.
- Logic was run in Node against the seed data (Draft, Documents Required, Under Review, Approved) and the answers matched the data. The React panel itself was not clicked in a browser.

## Partially completed work
- Assistant only exists on the institute application details page. It is not in the new-application wizard (form state lives in react-hook-form) nor in the officer workspace.
- Phase 3 layout work (wizard, review workspace, documents, admin pages) not done beyond wording and shared styles.
- Remaining "demo" text: audit action names, `src/data/*`, `DataContext.jsx` messages, notification seed text.

## Not yet completed (priority order)
1. Phase 5: run `npm run dev`, click through every route for all three roles, check ~390px and desktop widths, dark mode, and the assistant panel; fix what breaks.
2. Optional: structural improvements to the wizard, review workspace, documents and admin pages; assistant in wizard and officer views.
3. Optional: clean "demo" in `src/data/*`, `DataContext.jsx` and audit names (check `src/services/auditService.js` and any filters first).
4. Optional: replace stale seed notifications that mention "demo".

## Important existing functionality (do not remove)
Institute dashboard, new application wizard, my applications, application details, documents, compliance; officer dashboard, review queue, review workspace, compliance monitoring; admin dashboard, users, institutes, workflow config, rules, alerts, deadline reminders, audit logs; reports (CSV export), notifications, profile, settings (reset data), global search, help drawer, role switcher, dark mode, collapsible sidebar.

## Files changed
- Rewritten: `src/pages/public/Landing.jsx`, `src/components/common/Logo.jsx`, `src/components/dashboard/HeroPreview.jsx`, `index.html`, `public/favicon.svg`
- Edited: `tailwind.config.js`, `src/index.css`, `src/utils/constants.js` (APP_NAME, TEAM_ATTRIBUTION), `src/components/layout/{AppLayout,Sidebar,HelpDrawer}.jsx`, `src/pages/public/Login.jsx`, `README.md`, `package.json`, plus string-only rename edits in data/context/page files.

## Known issues
- Not visually inspected in a browser or at mobile widths (no screenshots taken), including all Phase 2 changes.
- Google Fonts (Inter, Instrument Serif) load from the network; fallbacks are system/Georgia.
- Landing hero preview uses static sample numbers (labelled illustrative).
- Dark mode of the landing page was not checked (hero/footer are always dark by design).

## Verification status
- Run and passed: `npm install`, `npm run build` (Vite, no errors) after each phase, including the final Phase 4 changes. Assistant logic tested in Node against seed data.
- Checked: no remaining "Trackify" in `src` except the required attribution constant.
- NOT run: dev server, route-by-route click-through, responsive checks, accessibility checks, assistant UI interaction in a browser.

## Next exact steps
1. `npm install && npm run dev`; open `/`, check desktop and ~390px widths, fix layout issues.
2. Visually check dashboards and fix anything the Phase 2 CSS changes broke.
3. Start Phase 3 (institute dashboard, applications, documents, compliance, officer review, admin).
4. Keep `TEAM_ATTRIBUTION` footers; update this file and `CONTINUE_PROMPT.md`; produce `themis-phase-3.zip`.

## Continuation instructions
Inspect the current files and this document, preserve completed work, and continue from the first unfinished task above. Do not rebuild existing modules. Do not claim anything is verified unless you ran it.


## Session update (static verification only)
- The sandbox had no network access, so `npm install`, `npm run build` and `npm run dev` could NOT be run in this session. Nothing here was click-tested in a browser.
- Checked statically: TypeScript parser over all 101 `.js/.jsx` files under `src` found zero syntax errors; a custom script confirmed every relative and `@/` import resolves and every named/default import has a matching export; all 26 lazy routes in `AppRoutes.jsx` point to existing files; `TEAM_ATTRIBUTION` footer still present on landing, login and app shell.
- README lines about the old amber "Demo role" button and "demo mode" corrected to current wording.
- Still open: Phase 5 browser verification (all routes x 3 roles, ~390px and desktop, dark mode, assistant panel), then the optional items above. Run `npm install && npm run dev` locally first.
