import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, BellRing, Building2, CheckCircle2, ClipboardCheck, FileCheck2, FileSearch, Gauge,
  LayoutDashboard, Menu, Scale, ScrollText, Send, ShieldCheck, Wrench, X, Eye,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import HeroPreview from '@/components/dashboard/HeroPreview';
import { useAuth } from '@/context/AuthContext';
import { ROLES, TEAM_ATTRIBUTION } from '@/utils/constants';

const NAV = [
  ['Platform', '#platform'],
  ['Features', '#features'],
  ['Workflow', '#workflow'],
  ['Benefits', '#benefits'],
];

const STRIP = ['Application tracking', 'Document validation', 'Compliance monitoring', 'Deadline alerts', 'Officer review', 'Audit history', 'Role-based dashboards', 'Workflow configuration'];

const FEATURES = [
  { icon: Send, title: 'Digital approval workflows', text: 'Move each application from submission to a recorded outcome through a configurable, trackable lifecycle.', span: 'lg:col-span-2' },
  { icon: FileSearch, title: 'Document assistance', text: 'Checks file types, sizes and required fields at upload. Deeper server-side verification needs a backend.', span: '' },
  { icon: ShieldCheck, title: 'Compliance monitoring', text: 'Follow faculty, infrastructure, intake and disclosure items against rules your administrators configure.', span: '' },
  { icon: BellRing, title: 'Deadlines and alerts', text: 'Upcoming and overdue tasks surface in every role, with reminder schedules you control.', span: '' },
  { icon: LayoutDashboard, title: 'Role-based dashboards', text: 'Focused workspaces for institutes, officers and administrators, each showing only what that role needs.', span: 'lg:col-span-2' },
  { icon: ScrollText, title: 'Transparent activity history', text: 'Each action is recorded with actor, role, entity and time, so the path to any status is easy to retrace.', span: 'lg:col-span-3' },
];

const STEPS = [
  { icon: Send, title: 'Submit', text: 'Complete a guided application and attach the required documents.' },
  { icon: FileCheck2, title: 'Check', text: 'Missing files and incomplete fields are flagged before review begins.' },
  { icon: ClipboardCheck, title: 'Review', text: 'Officers go through documents and compliance items and keep notes.' },
  { icon: Wrench, title: 'Resolve', text: 'Respond to document requests and close deficiencies in one place.' },
  { icon: Eye, title: 'Track', text: 'See the status, feedback and a clear timeline of what happened.' },
];

const BENEFITS = [
  ['Manage applications', 'Every application, its stage and its next step in one view.'],
  ['Find what is missing', 'Missing documents and incomplete information are called out early.'],
  ['Monitor compliance', 'Open requirements per institute, with evidence attached to each.'],
  ['Track deadlines', 'Upcoming and overdue dates, so nothing lapses unnoticed.'],
];

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.5 } };

export default function Landing() {
  const navigate = useNavigate();
  const { session, signIn } = useAuth();
  const [menu, setMenu] = useState(false);

  const explore = () => {
    const current = session || signIn('institute');
    navigate(ROLES[current.role].home);
  };

  return (
    <div className="min-h-screen bg-page">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo light />
          <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1.5 backdrop-blur md:flex">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="rounded-full px-4 py-1.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white">{label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-white/80 hover:text-white">Sign In</Link>
            <button type="button" onClick={explore} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy transition-transform hover:scale-[1.03]">Explore Platform <ArrowRight size={15} aria-hidden="true" /></button>
          </div>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden" onClick={() => setMenu((m) => !m)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menu && (
          <div className="mx-4 rounded-2xl border border-white/10 bg-sidebar/95 px-4 py-3 backdrop-blur md:hidden">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10">{label}</a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/login" className="btn bg-white/10 text-white hover:bg-white/20">Sign In</Link>
              <button type="button" onClick={explore} className="btn bg-white text-navy">Explore</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="platform" className="relative overflow-hidden bg-sidebar pb-20 pt-32 text-white lg:pb-28 lg:pt-40">
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-brand/40 blur-[120px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">AICTE approval workspace</p>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]">
                Every Approval.<br />Every Requirement.<br /><span className="italic text-accent">Under Control.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Themis brings application workflows, document validation, compliance tracking, and deadline management together in one intelligent workspace.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={explore} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-navy transition-transform hover:scale-[1.03]">
                  Explore Platform <ArrowRight size={18} aria-hidden="true" />
                </button>
                <a href="#workflow" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10">See the workflow</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mx-auto mt-16 max-w-4xl">
              <div className="float-slow"><HeroPreview /></div>
            </motion.div>
          </div>
        </section>

        <div className="overflow-hidden border-b border-line bg-card py-4" aria-hidden="true">
          <div className="marquee flex w-max gap-10 whitespace-nowrap text-sm font-medium text-muted">
            {[...STRIP, ...STRIP].map((t, i) => (<span key={i} className="flex items-center gap-10">{t}<span className="h-1 w-1 rounded-full bg-accent" /></span>))}
          </div>
        </div>

        <section id="features" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Platform capabilities" title={<>One workspace for the <em className="text-accent">entire</em> approval journey</>} />
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, text, span }, i) => (
                <motion.article key={title} {...fade} transition={{ duration: 0.5, delay: (i % 3) * 0.06 }} className={`group rounded-3xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-pop ${span}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white transition-colors group-hover:bg-accent"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className="mt-6 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-sidebar py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle dark eyebrow="Workflow" title={<>From submission to status, <em className="text-accent">step by step</em></>} />
            <ol className="mt-14 grid gap-4 md:grid-cols-5">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <motion.li key={title} {...fade} transition={{ duration: 0.5, delay: i * 0.07 }} className="relative rounded-3xl border border-white/10 bg-white/5 p-6">
                  <span className="font-display text-5xl text-accent/80">0{i + 1}</span>
                  <Icon size={22} className="mt-6 text-white" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section id="benefits" className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionTitle align="left" eyebrow="Benefits" title={<>Clarity for institutes, <em className="text-accent">focus</em> for officers</>} />
              <p className="mt-5 max-w-lg text-muted">Themis keeps applications, documents, compliance items and deadlines in a single view, so everyone works from the same up-to-date picture.</p>
              <ul className="mt-8 space-y-3">
                {BENEFITS.map(([t, d]) => (
                  <li key={t} className="flex items-start gap-3 rounded-2xl border border-line bg-card p-4">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                    <span><span className="block text-sm font-semibold text-ink">{t}</span><span className="block text-sm text-muted">{d}</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-navy p-7 text-white sm:p-9">
              <h3 className="font-display text-3xl">Step into a workspace</h3>
              <p className="mt-2 text-sm text-white/70">Open any role with sample data. No credentials needed.</p>
              <div className="mt-6 space-y-3">
                {[['institute', Building2], ['officer', Scale], ['admin', Gauge]].map(([key, Icon]) => (
                  <button key={key} type="button" onClick={() => { const s = signIn(key); navigate(ROLES[s.role].home); }}
                    className="flex w-full items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 text-left transition-colors hover:bg-white/15">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent"><Icon size={18} aria-hidden="true" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{ROLES[key].label}</span>
                      <span className="block text-xs text-white/60">{ROLES[key].blurb}</span>
                    </span>
                    <ArrowRight size={16} className="shrink-0 text-white/60" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-white/50">Themis is an independent project, not an official AICTE system. Data shown is illustrative and stored only in your browser; outcomes are simulated.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-sidebar text-white/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <Logo light />
            <p className="mt-3 text-sm leading-relaxed">Approval workflows, document validation, compliance monitoring and deadline management.</p>
          </div>
          <FooterCol title="Platform" links={[['Overview', '#platform'], ['Features', '#features']]} />
          <FooterCol title="Learn" links={[['Workflow', '#workflow'], ['Benefits', '#benefits']]} />
          <div>
            <h4 className="text-sm font-semibold text-white">Access</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
              <li><Link to="/forgot-password" className="hover:text-white">Password help</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs">{TEAM_ATTRIBUTION}</div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title, align = 'center', dark = false }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-xl'}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl [&_em]:italic ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([label, href]) => (<li key={label}><a href={href} className="hover:text-white">{label}</a></li>))}
      </ul>
    </div>
  );
}
