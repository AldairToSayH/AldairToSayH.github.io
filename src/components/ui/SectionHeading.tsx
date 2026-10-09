import Reveal from '../motion/Reveal';

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <h2 className="text-balance font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
