export default function SceneFallback() {
  const colors = ['#050505', '#111111', '#262626', '#080808', '#9A9A96', '#151515', '#030303', '#202020', '#0B0B0B'];

  return (
    <div className="relative flex h-full min-h-[22rem] items-center justify-center" aria-hidden="true">
      <div className="absolute h-64 w-64 rounded-full bg-white/[0.035] blur-3xl" />
      <div className="relative grid w-52 rotate-[-8deg] grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-[#050505] p-3 shadow-[24px_28px_70px_rgba(0,0,0,.75)] sm:w-64">
        {colors.map((color, index) => (
          <span key={index} className="aspect-square rounded-md border border-white/[0.035]" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="absolute left-[13%] top-[24%] h-16 w-16 rotate-12 border border-white/10" />
      <div className="absolute bottom-[20%] right-[12%] h-20 w-20 rounded-full border border-white/10" />
    </div>
  );
}
