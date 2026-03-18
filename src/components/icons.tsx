export function IconGithub(props: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={props.title ? undefined : true}
      role={props.title ? "img" : "presentation"}
      className={props.className}
    >
      {props.title ? <title>{props.title}</title> : null}
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.5-.7 1.5-.7.3-.8.7-1.2 1-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C15.7 4.3 16.7 4.6 16.7 4.6c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

export function IconArrowRight(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconDownload(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v11" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5 5 5-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
    </svg>
  );
}

export function IconPlay(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l12 7-12 7V5z" />
    </svg>
  );
}

export function IconViewList(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3.5 6h.01" />
      <path d="M3.5 12h.01" />
      <path d="M3.5 18h.01" />
    </svg>
  );
}

export function IconViewGrid(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M4 4h7v7H4z" />
      <path d="M13 4h7v7h-7z" />
      <path d="M4 13h7v7H4z" />
      <path d="M13 13h7v7h-7z" />
    </svg>
  );
}

export function IconChevronLeft(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function IconChevronRight(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconMenu(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}

export function IconTapsPackage(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M10 11.5h11a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-13a4 4 0 0 1 4-4Z" />
      <path d="M25 15l8 4.5v9.5a3.5 3.5 0 0 1-3.5 3.5H22" />
      <path d="M25 15v7h8" />
      <path d="M11.5 18h8.5" />
      <path d="M11.5 23h8.5" />
      <path d="M11.5 28h5.5" />
    </svg>
  );
}

export function IconFrameworkBridge(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="30" cy="10" r="3.5" />
      <circle cx="20" cy="30" r="3.5" />
      <rect x="14" y="15" width="12" height="8" rx="3" />
      <path d="M12.7 12.7 16 16" />
      <path d="M27.3 12.7 24 16" />
      <path d="M18 23l-4.5 4.2" />
      <path d="M22 23l4.5 4.2" />
    </svg>
  );
}

export function IconPreviewWindow(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <rect x="6" y="8" width="28" height="24" rx="6" />
      <path d="M6 14h28" />
      <circle cx="11" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      <path d="m17 19 9 5.5-9 5.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSkillSpark(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="m24 7 1.8 4.6L30.5 13l-4.7 1.4L24 19l-1.8-4.6L17.5 13l4.7-1.4L24 7Z" />
      <rect x="8" y="22" width="8" height="8" rx="2" />
      <rect x="19" y="22" width="8" height="8" rx="2" />
      <rect x="13.5" y="11" width="8" height="8" rx="2" />
      <path d="M17 22v-3" />
      <path d="M22 22v-3" />
      <path d="M17 19h5" />
    </svg>
  );
}

export function IconTutorialCompass(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="13" />
      <path d="m24.5 15.5-3.5 8.5-8.5 3.5 3.5-8.5 8.5-3.5Z" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLocalizationGlobe(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="18" cy="20" r="10" />
      <path d="M8.5 20h19" />
      <path d="M18 10c3.4 3.1 5.1 6.4 5.1 10s-1.7 6.9-5.1 10" />
      <path d="M18 10c-3.4 3.1-5.1 6.4-5.1 10s1.7 6.9 5.1 10" />
      <path d="M25.5 12.5h6a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5h-1.8l-2.7 2.8v-2.8h-1.5" />
    </svg>
  );
}

export function IconVoiceWave(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M10 14.5h10A5.5 5.5 0 0 1 25.5 20v2.5A5.5 5.5 0 0 1 20 28H16l-4.5 4v-4H10A5.5 5.5 0 0 1 4.5 22.5V20A5.5 5.5 0 0 1 10 14.5Z" />
      <path d="M30 15c2 1.5 3 3.3 3 5.5S32 24.5 30 26" />
      <path d="M26.5 17.5c1.1.8 1.6 1.8 1.6 3s-.5 2.2-1.6 3" />
      <path d="M12.5 20.5h5" />
      <path d="M12.5 23.5h7" />
    </svg>
  );
}

export function IconQaChecklist(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <rect x="8" y="8" width="16" height="24" rx="4" />
      <path d="m12.5 16 2.2 2.2 4.1-4.4" />
      <path d="M12.5 23h7" />
      <path d="M27 24.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
      <path d="m31 28.5 3 3" />
    </svg>
  );
}

export function IconRegistryPath(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="10" cy="28" r="3" />
      <circle cx="20" cy="20" r="3" />
      <path d="M13 27c3.5 0 4.5-4 7-6" />
      <path d="M23 18V9" />
      <path d="m23 9 9 3.5-9 3.5V9Z" />
      <path d="M8 12h8" />
    </svg>
  );
}

export function IconVariantBranch(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="12" cy="10" r="3" />
      <circle cx="28" cy="10" r="3" />
      <circle cx="20" cy="30" r="3" />
      <path d="M12 13v4c0 3 2.5 5 8 5" />
      <path d="M28 13v4c0 3-2.5 5-8 5" />
      <path d="M20 22v5" />
    </svg>
  );
}

export function IconReviewSheet(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M11 8h12l6 6v15a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z" />
      <path d="M23 8v6h6" />
      <path d="M12.5 21.5c2.4-3 4.9-4.5 7.5-4.5s5.1 1.5 7.5 4.5c-2.4 3-4.9 4.5-7.5 4.5s-5.1-1.5-7.5-4.5Z" />
      <circle cx="20" cy="21.5" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconOrgCluster(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="20" cy="10" r="3.5" />
      <circle cx="10" cy="24" r="3.5" />
      <circle cx="30" cy="24" r="3.5" />
      <circle cx="20" cy="30" r="3.5" />
      <path d="M18 12.8 12 21" />
      <path d="M22 12.8 28 21" />
      <path d="M13.5 26.5 16.8 28" />
      <path d="M26.5 26.5 23.2 28" />
    </svg>
  );
}

