export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[1.05fr_1fr] bg-white text-[#0f1419]">
      <section className="relative hidden md:flex items-center justify-center bg-[#1d9bf0] px-14 py-16 text-white">
        <div className="max-w-[420px]">
          <p className="text-[92px] leading-none font-black tracking-[-0.04em]">Twitter</p>
          <h1 className="mt-8 text-5xl font-black leading-[1.1]">
            See what&apos;s happening right now
          </h1>
          <p className="mt-5 text-xl text-white/90">
            Join conversations with people and topics you care about.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 md:px-10">
        <div className="w-full max-w-[430px]">
          <p className="text-2xl font-black tracking-tight text-[#1d9bf0]">twitter</p>
          <h2 className="mt-5 text-[34px] font-black leading-[1.15] text-[#0f1419]">{title}</h2>
          <p className="mt-2 text-sm text-[#536471]">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
