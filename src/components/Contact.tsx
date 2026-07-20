import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import Reveal from './motion/Reveal';
import AmbientAudioControl from './ui/AmbientAudioControl';
import TechIcon from './ui/TechIcon';

const WEB3FORMS_ACCESS_KEY = '4b08bbb2-1593-4b50-bdc5-563c0b749103';

const socials = [
  { icon: 'mail' as const, label: 'zavalapisxlpo@gmail.com', href: 'mailto:zavalapisxlpo@gmail.com', external: false },
  { icon: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aldair-zavala-h-b18a68378', external: true },
  { icon: 'github' as const, label: 'GitHub', href: 'https://github.com/AldairToSayH', external: true },
  { icon: 'whatsapp' as const, label: 'WhatsApp', href: 'https://wa.me/51971328247', external: true },
];

type FieldName = 'nombre' | 'correo' | 'mensaje';
type Errors = Partial<Record<FieldName, string>>;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (values.nombre.trim().length < 2) errors.nombre = 'Escribe un nombre válido.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo.trim())) errors.correo = 'Escribe un correo válido.';
  if (values.mensaje.trim().length < 10) errors.mensaje = 'Cuéntame un poco más (mínimo 10 caracteres).';
  return errors;
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [errors, setErrors] = useState<Errors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const form = event.currentTarget.form;
    if (!form) return;
    const data = new FormData(form);
    const values = { nombre: String(data.get('nombre') ?? ''), correo: String(data.get('correo') ?? ''), mensaje: String(data.get('mensaje') ?? '') };
    const next = validate(values);
    const name = event.currentTarget.name as FieldName;
    setErrors((current) => ({ ...current, [name]: next[name] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = { nombre: String(formData.get('nombre') ?? ''), correo: String(formData.get('correo') ?? ''), mensaje: String(formData.get('mensaje') ?? '') };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setSubmitStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Nuevo mensaje desde el portafolio de Aldair Zavala',
          from_name: 'Portafolio Aldair Zavala',
          name: values.nombre,
          email: values.correo,
          message: values.mensaje,
          botcheck: formData.get('botcheck'),
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error('Submission failed');
      form.reset();
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.035] py-24 sm:py-32">
      <div className="technical-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_75%,transparent)]" aria-hidden="true" />
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-teal/[0.06] blur-3xl" aria-hidden="true" />
      <div className="section-shell relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal direction="left">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-teal"><span className="text-violet">07</span> / contacto</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">Construyamos algo que importe.</h2>
          <p className="mt-6 text-base leading-8 text-text-muted sm:text-lg">Si tienes una oportunidad, colaboración o idea técnica relacionada con seguridad, software o infraestructura, conversemos.</p>
          <div className="mt-9 grid gap-2">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target={social.external ? '_blank' : undefined} rel={social.external ? 'noopener noreferrer' : undefined} className="group flex min-h-12 items-center gap-4 rounded-xl border border-transparent px-3 py-2 text-text-muted transition hover:border-border-dim hover:bg-card/55 hover:text-teal">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-dim bg-card text-violet transition group-hover:border-teal/30 group-hover:text-teal"><TechIcon name={social.icon} className="h-5 w-5" /></span>
                <span className="min-w-0 truncate font-display text-sm font-semibold">{social.label}</span><span className="ml-auto text-xs opacity-0 transition group-hover:opacity-100" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <AmbientAudioControl />
        </Reveal>

        <Reveal direction="right" delay={0.08}>
          <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-border-dim bg-card/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-border-dim pb-5">
              <div><p className="font-display text-xl font-bold text-white">Nueva conversación</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">Respuesta directa por correo</p></div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/20 bg-teal/[0.06] text-teal"><TechIcon name="mail" className="h-4 w-4" /></span>
            </div>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field name="nombre" label="Nombre" type="text" placeholder="Tu nombre" error={errors.nombre} onBlur={handleBlur} />
              <Field name="correo" label="Correo" type="email" placeholder="tu@email.com" error={errors.correo} onBlur={handleBlur} />
              <label className="grid gap-2 sm:col-span-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">Mensaje</span>
                <textarea name="mensaje" rows={6} placeholder="Cuéntame sobre tu proyecto o propuesta" onBlur={handleBlur} aria-invalid={Boolean(errors.mensaje)} aria-describedby={errors.mensaje ? 'mensaje-error' : undefined} className="resize-none rounded-xl border border-border-dim bg-void/70 px-4 py-3 text-sm leading-7 text-text-prime outline-none transition placeholder:text-text-muted/60 focus:border-teal/60 focus:ring-4 focus:ring-teal/[0.07]" />
                {errors.mensaje && <span id="mensaje-error" className="text-xs text-[#ff8c83]" role="alert">{errors.mensaje}</span>}
              </label>
            </div>
            <button type="submit" disabled={submitStatus === 'sending'} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-violet px-7 py-3.5 font-display text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#7971ff] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto">
              {submitStatus === 'sending' ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none" />Enviando</> : <>Enviar mensaje <span aria-hidden="true">→</span></>}
            </button>
            <AnimatePresence mode="wait">
              {submitStatus === 'success' && <motion.p key="success" initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-xl border border-teal/25 bg-teal/[0.06] px-4 py-3 text-sm text-teal" role="status">Mensaje enviado correctamente. Te responderé pronto.</motion.p>}
              {submitStatus === 'error' && <motion.p key="error" initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-xl border border-[#ff8c83]/25 bg-[#ff8c83]/[0.06] px-4 py-3 text-sm text-[#ffaaa4]" role="alert">No se pudo enviar. Inténtalo nuevamente o escríbeme por correo.</motion.p>}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ name, label, type, placeholder, error, onBlur }: { name: FieldName; label: string; type: 'text' | 'email'; placeholder: string; error?: string; onBlur: (event: React.FocusEvent<HTMLInputElement>) => void }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">{label}</span>
      <input name={name} type={type} placeholder={placeholder} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className="rounded-xl border border-border-dim bg-void/70 px-4 py-3 text-sm text-text-prime outline-none transition placeholder:text-text-muted/60 focus:border-teal/60 focus:ring-4 focus:ring-teal/[0.07]" />
      {error && <span id={`${name}-error`} className="text-xs text-[#ff8c83]" role="alert">{error}</span>}
    </label>
  );
}
