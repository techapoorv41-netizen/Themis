import { Link } from 'react-router-dom';
import { APP_NAME } from '@/utils/constants';

/** Themis mark: balanced scales formed from a stylised "T" with a checked beam. */
export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="themis-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#245B91" />
          <stop offset="1" stopColor="#0F2A4A" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#themis-g)" />
      <path d="M8 10.5h16M16 10.5V23" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M11.5 23h9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".85" />
      <circle cx="24" cy="10.5" r="3.4" fill="#3B82F6" />
      <path d="M22.5 10.6l1.1 1.1 2-2.3" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ to = '/', light = false, showText = true, size = 32 }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 rounded-lg" aria-label={`${APP_NAME} home`}>
      <LogoMark size={size} />
      {showText && <span className={`text-lg font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>{APP_NAME}</span>}
    </Link>
  );
}
