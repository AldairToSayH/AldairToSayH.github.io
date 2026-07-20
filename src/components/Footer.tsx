const links = [
  { label: 'GitHub', href: 'https://github.com/AldairToSayH', short: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aldair-zavala-h-b18a68378', short: 'IN' },
  { label: 'WhatsApp', href: 'https://wa.me/51971328247', short: 'WA' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-dim px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div><p className="font-display text-lg font-bold text-white">Aldair Zavala</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">© 2022–{new Date().getFullYear()} · Construido con Astro, React y ❤.</p></div>
        <div className="flex gap-2">
          {links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex h-10 min-w-10 items-center justify-center rounded-full border border-border-dim px-3 font-mono text-[10px] font-bold text-text-muted transition hover:border-teal/50 hover:text-teal" aria-label={link.label}>{link.short}</a>)}
        </div>
      </div>
    </footer>
  );
}
