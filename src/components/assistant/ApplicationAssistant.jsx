import { useMemo, useRef, useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import Panel from '@/components/dashboard/Panel';
import { SUGGESTED_QUESTIONS, answerQuestion, buildContext } from '@/services/assistantService';

export default function ApplicationAssistant({ app, documents }) {
  const ctx = useMemo(() => buildContext(app, documents), [app, documents]);
  const [thread, setThread] = useState([]);
  const [text, setText] = useState('');
  const endRef = useRef(null);

  const ask = (q) => {
    const question = q.trim();
    if (!question) return;
    setThread((t) => [...t, { from: 'user', lines: [question] }, { from: 'bot', lines: answerQuestion(question, ctx) }]);
    setText('');
    setTimeout(() => endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 50);
  };

  return (
    <Panel title="Application Assistant" subtitle="Rule-based helper using this application's data. Not an AI model.">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button key={q} type="button" onClick={() => ask(q)} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1.5 text-left text-xs font-medium text-ink transition-colors hover:border-accent/50 hover:bg-accent-50">
            <Sparkles size={12} className="shrink-0 text-accent" aria-hidden="true" />{q}
          </button>
        ))}
      </div>

      {thread.length > 0 && (
        <div className="scroll-thin mt-4 max-h-80 space-y-3 overflow-y-auto pr-1" aria-live="polite">
          {thread.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.from === 'user' ? 'justify-end' : ''}`}>
              {m.from === 'bot' && <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-white"><Bot size={14} aria-hidden="true" /></span>}
              <div className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm ${m.from === 'user' ? 'bg-navy text-white' : 'bg-soft text-ink'}`}>
                {m.lines.map((l, j) => <p key={j} className={j ? 'mt-1.5' : ''}>{l}</p>)}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}

      <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
        <label htmlFor="assistant-q" className="sr-only">Ask about this application</label>
        <input id="assistant-q" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about status, documents or compliance" maxLength={200} />
        <button type="submit" className="btn btn-primary shrink-0" disabled={!text.trim()} aria-label="Send question"><Send size={16} /></button>
      </form>
      <p className="mt-3 text-[11px] leading-snug text-muted">Answers come from fixed rules over your current application data. The assistant cannot approve, reject or predict official decisions.</p>
    </Panel>
  );
}
