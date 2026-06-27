export default function AdminOrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Orders</p>
      <h1 className="mt-4 font-display text-5xl text-white">Order queue</h1>
      <div className="mt-8 rounded-[2rem] border border-white/10 bg-carbon-card p-6">
        <table className="w-full text-left text-sm">
          <thead className="text-white/50">
            <tr>
              <th className="py-3">Order</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Status</th>
              <th className="py-3">Total</th>
            </tr>
          </thead>
          <tbody className="text-white/75">
            <tr className="border-t border-white/10">
              <td className="py-4">#0001</td>
              <td className="py-4">Demo customer</td>
              <td className="py-4 text-gold">Placeholder</td>
              <td className="py-4">$0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

