import Reveal from '../motion/Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  index: string;
};

export default function SectionHeading({ eyebrow, title, description, align = 'left', index }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-teal sm:text-sm">
        <span className="text-violet">{index}</span> / {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
