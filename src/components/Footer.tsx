import React from 'react';

const links = [
  { label: 'GitHub', href: 'https://github.com/AldairToSayH', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aldair-zavala-h-b18a68378', icon: 'IN' },
  { label: 'WhatsApp', href: 'https://wa.me/51971328247', icon: 'WA' },
];

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-dim px-5 py-10 text-center sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-sm text-text-muted">© 2025 Aldair Zavala · Construido con 💜 en Cusco, Peru</p>
        <div className="mt-5 flex justify-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-dim bg-card font-mono text-xs font-bold text-text-muted transition hover:border-teal hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
