import { REQUIRED_DOCS } from '@/utils/constants';
import { isOpenIssue } from '@/utils/compliance';
import { formatDate } from '@/utils/format';

/**
 * Rule-based Application Assistant. This is NOT an AI model: it reads the application's
 * current state (status, documents, compliance items, reviewer feedback) and returns
 * templated explanations. It never approves, rejects or predicts an official decision.
 */

export const SUGGESTED_QUESTIONS = [
  'Why is my application still pending?',
  'Which documents are missing?',
  'What should I complete before submitting?',
  'Summarize the outstanding compliance requirements.',
];

const FLAGGED = ['Missing Information', 'Review Required'];

export function buildContext(app, documents) {
  const docs = documents.filter((d) => d.applicationId === app.id);
  const missing = REQUIRED_DOCS.filter((r) => !docs.some((d) => d.docKey === r.key));
  const flagged = docs.filter((d) => FLAGGED.includes(d.validationStatus));
  const open = (app.complianceItems || []).filter((c) => isOpenIssue(c) || c.status === 'Evidence Pending');
  return { app, docs, missing, flagged, open };
}

const STATUS_EXPLAIN = {
  Draft: 'It is still a draft, so it has not been sent for review yet.',
  Submitted: 'It has been submitted and is waiting to enter validation.',
  'Validation Pending': 'It is queued for automated completeness checks (file type, size and required fields).',
  'Under Review': 'An officer is reviewing it. Nothing further is needed from you unless a request appears.',
  'Documents Required': 'The reviewer asked for additional or corrected documents, so it is waiting on you.',
  Approved: 'An approval was recorded in this workspace (a simulated outcome, not an official AICTE decision).',
  Rejected: 'A rejection was recorded in this workspace (a simulated outcome, not an official AICTE decision).',
};

const docLine = (d) => `${d.name || d.fileName}: ${d.validationStatus}`;

function why({ app, missing, flagged }) {
  const lines = [`${app.id} is "${app.status}". ${STATUS_EXPLAIN[app.status] || ''}`.trim()];
  if (app.status === 'Documents Required' && app.deficiency?.reason) lines.push(`Reviewer note: ${app.deficiency.reason}`);
  if (missing.length) lines.push(`Missing document${missing.length > 1 ? 's' : ''}: ${missing.map((m) => m.name).join(', ')}.`);
  if (flagged.length) lines.push(`Flagged by checks: ${flagged.map(docLine).join('; ')}.`);
  if (app.updatedAt) lines.push(`Last updated ${formatDate(app.updatedAt)}.`);
  return lines;
}

function docs({ app, missing, flagged }) {
  if (!missing.length && !flagged.length) return [`All ${REQUIRED_DOCS.length} required documents are attached and none are flagged by the local checks for ${app.id}.`, 'These checks only look at file presence, type, size and fields. They are not an official verification.'];
  const lines = [];
  if (missing.length) lines.push(`Not yet uploaded: ${missing.map((m) => `${m.name} (${m.ext.toUpperCase()})`).join(', ')}.`);
  if (flagged.length) lines.push(`Uploaded but flagged: ${flagged.map(docLine).join('; ')}. Replacing these files may help.`);
  if (app.status === 'Draft') lines.push('Use "Continue draft" to attach or replace documents.');
  else if (app.status === 'Documents Required') lines.push('You can upload or replace documents from this page.');
  else lines.push(`Documents can only be changed while the application is a Draft or in "Documents Required" (currently "${app.status}").`);
  return lines;
}

function before({ app, missing, flagged }) {
  if (app.status !== 'Draft') return [`${app.id} is already past the draft stage ("${app.status}").`, ...(app.status === 'Documents Required' ? ['To respond, fix the items below and use "Respond".', ...docs({ app, missing, flagged })] : [])];
  const lines = ['Before submitting, check that:'];
  lines.push(missing.length ? `- Attach the missing document${missing.length > 1 ? 's' : ''}: ${missing.map((m) => m.name).join(', ')}.` : '- All required documents are attached (done).');
  if (flagged.length) lines.push(`- Flagged files are fixed: ${flagged.map(docLine).join('; ')}.`);
  lines.push('- Program details and proposed intake are filled in and accurate.');
  return lines;
}

function compliance({ open, app }) {
  const items = app.complianceItems || [];
  if (!items.length) return ['There are no compliance items linked to this application.'];
  if (!open.length) return [`All ${items.length} compliance items on ${app.id} are marked Compliant.`];
  return [`${open.length} of ${items.length} compliance items are not yet satisfied:`, ...open.map((c) => `- ${c.name} (${c.category}): ${c.status}`), 'Statuses follow rules configured in this workspace and are not AICTE regulations.'];
}

function next(ctx) {
  const { app, missing, flagged } = ctx;
  switch (app.status) {
    case 'Draft': return ['Next: finish and submit the application.', ...before(ctx).slice(1)];
    case 'Documents Required': return ['Next: address the reviewer request, then respond on this page.', ...docs({ app, missing, flagged })];
    case 'Submitted': case 'Validation Pending': case 'Under Review': return ['No action is needed from you right now.', 'Watch notifications for any document request.'];
    default: return ['No further action is pending on this application.'];
  }
}

const INTENTS = [
  [/missing|document|upload|file|attach/i, docs],
  [/complian|requirement|rule|evidence/i, compliance],
  [/before|submit|complete|ready|checklist/i, before],
  [/next|step|what (do|should)|todo|action/i, next],
  [/why|pending|status|stuck|wait|delay|slow|still/i, why],
];

export function answerQuestion(question, ctx) {
  const q = question.trim();
  if (/approv|reject|decid|chance|guarantee|will (it|my)|likely|predict/i.test(q)) {
    return ['I cannot make or predict approval or rejection decisions. Those come from the review process.', ...why(ctx).slice(0, 2)];
  }
  const hit = INTENTS.find(([re]) => re.test(q));
  return (hit ? hit[1] : why)(ctx);
}
