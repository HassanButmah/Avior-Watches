import { getProducts } from '@/lib/data';

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const watchCount = products.filter((product) => product.category === 'watches').length;
  const accessoryCount = products.length - watchCount;
  const stats = [
    { label: 'Products', value: products.length },
    { label: 'Watches', value: watchCount },
    { label: 'Accessories', value: accessoryCount },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Dashboard</p>
      <h1 className="mt-4 font-display text-5xl text-white">Overview</h1>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-white/10 bg-carbon-card p-6">
            <p className="text-sm text-white/50">{stat.label}</p>
            <p className="mt-3 font-display text-4xl text-gold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border border-white/10 bg-carbon-card p-6">
        <h2 className="font-display text-3xl text-white">Content status</h2>
        <p className="mt-4 max-w-2xl text-white/60 leading-7">
          Products and settings are currently persisted in JSON files for dev/demo usage. Move to a database before production
          deployment on Vercel if you need runtime admin writes to survive serverless resets.
        </p>
      </div>
    </div>
  );
}
