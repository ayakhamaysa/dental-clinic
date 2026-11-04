const paths = {
  tooth: <path d="M8 3C5 3 4 5.5 4 8c0 3 1.5 4 2 7 .5 3 1 6 2.5 6S10 17 11 15c.5-1 1.5-1 2 0 1 2 1 6 2.5 6s2-3 2.5-6c.5-3 2-4 2-7 0-2.5-1-5-4-5-2 0-3 1-4 1S10 3 8 3z" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  smile: <><circle cx="12" cy="12" r="9" /><path d="M8 14c1 1.5 2.4 2.2 4 2.2s3-.7 4-2.2M9 9.5h.01M15 9.5h.01" /></>,
  implant: <><path d="M8 3c-2 0-3 1.5-3 3.5S6 10 7 10h10c1 0 2-1.5 2-3.5S18 3 16 3c-1.5 0-2.5 1-4 1S9.5 3 8 3z" /><path d="M9 10v2h6v-2M10 12l1 9h2l1-9M9.5 15h5M10 18h4" /></>,
  shield: <><path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  child: <><circle cx="12" cy="7" r="3" /><path d="M6 21v-3a6 6 0 0 1 12 0v3" /></>,
  check: <path d="M5 12l5 5 9-10" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
};

export default function Icon({ name, className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
}
