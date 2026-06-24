import Link from 'next/link';

const footerLinks = {
  shop: [
    { href: '/collection', label: 'All Watches' },
    { href: '/collection?collection=Prestige', label: 'Prestige' },
    { href: '/collection?collection=Sports', label: 'Sports' },
    { href: '/collection?collection=Heritage', label: 'Heritage' },
  ],
  company: [
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
  ],
  support: [
    { href: '/contact', label: 'Customer Care' },
    { href: '/contact', label: 'Shipping & Returns' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl luxury-gradient-text tracking-widest mb-4">AVIOR</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Luxury timepieces crafted with precision and passion. Swiss-inspired engineering, Palestinian heritage.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs tracking-wider">&copy; {new Date().getFullYear()} Avior Prestige. All rights reserved.</p>
          <p className="text-white/30 text-xs tracking-widest uppercase">Crafted with precision · Est. 2025</p>
        </div>
      </div>
    </footer>
  );
}
