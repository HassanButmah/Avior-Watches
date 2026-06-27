const stats = [
  ['2026', 'Launch year'],
  ['6', 'Initial products'],
  ['2', 'Languages'],
  ['24/7', 'Support window'],
];

const timeline = [
  ['Rooted in Hebron', 'A brand language built on discipline, heritage, and restrained luxury.'],
  ['Digital first', 'A storefront designed as a narrative, not a catalog.'],
  ['Ready to scale', 'The current JSON-backed implementation can be swapped to a database later.'],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-gold/70">About Avior</p>
        <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">Built to feel like an object, not a template.</h1>
        <p className="mt-6 text-lg leading-8 text-white/65">
          The site pairs luxury editorial styling with commerce mechanics: cart persistence, admin editing, and a checkout flow
          ready for Stripe integration.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-carbon-card p-6">
            <p className="font-display text-4xl text-gold">{value}</p>
            <p className="mt-2 text-sm text-white/55">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {timeline.map(([title, body]) => (
          <div key={title} className="rounded-[2rem] border border-white/10 bg-carbon-card p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">{title}</p>
            <p className="mt-4 text-white/65 leading-7">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

