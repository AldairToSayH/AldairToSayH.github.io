type TechIconProps = {
  name: 'security' | 'code' | 'database' | 'network' | 'tools' | 'mail' | 'linkedin' | 'github' | 'whatsapp';
  className?: string;
};

const paths: Record<TechIconProps['name'], React.ReactNode> = {
  security: <><path d="M12 3 5 6v5c0 4.6 2.9 8.4 7 10 4.1-1.6 7-5.4 7-10V6l-7-3Z"/><path d="m9.5 12 1.6 1.6 3.7-4"/></>,
  code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/></>,
  database: <><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
  network: <><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m10.8 7.2-4.6 8.6M13.2 7.2l4.6 8.6M7.5 18h9"/></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-2.4 2.4-2.1-2.1a4 4 0 0 0 5 5l7.1 7.1a2.1 2.1 0 0 1-3 3l-7.1-7.1"/><path d="m5 13-3 3 3 3 3-3"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  linkedin: <><path d="M8 10v8M8 6.5v.1M12 18v-4.5a3.5 3.5 0 0 1 7 0V18M12 10v8"/></>,
  github: <><path d="M12 3a9 9 0 0 0-2.8 17.5c.4.1.6-.2.6-.4v-1.6c-2.4.5-3-1-3-1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4-1-4-4.4 0-1 .3-1.8.9-2.4-.1-.2-.4-1.2.1-2.4 0 0 .8-.2 2.5.9A8.7 8.7 0 0 1 12 8c.8 0 1.5.1 2.2.3 1.7-1.1 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4 4.4.3.3.6.8.6 1.5v2c0 .2.2.5.6.4A9 9 0 0 0 12 3Z"/></>,
  whatsapp: <><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"/><path d="M8.5 8.2c.6 3 2.3 4.7 5.3 5.5"/></>,
};

export default function TechIcon({ name, className = 'h-6 w-6' }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
