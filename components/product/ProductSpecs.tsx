'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw } from 'lucide-react';
import type { WatchSpecs } from '@/lib/watches';

interface ProductSpecsProps {
  specs: WatchSpecs;
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  const specItems = [
    { label: 'Movement', value: specs.movement },
    { label: 'Case Size', value: specs.caseSize },
    { label: 'Case Material', value: specs.caseMaterial },
    { label: 'Water Resistance', value: specs.water_resistance },
    { label: 'Crystal', value: specs.crystal },
    { label: 'Dial', value: specs.dial },
    { label: 'Strap', value: specs.strap },
    { label: 'Power Reserve', value: specs.power_reserve },
  ];

  return (
    <section className="py-16 md:py-20 border-t border-white/10" aria-labelledby="specs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="specs-heading" className="font-display text-3xl md:text-4xl text-white mb-10">
          Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {specItems.map((spec, idx) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="glass-surface luxury-border rounded-lg p-5 hover:border-gold/20 transition-colors"
            >
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{spec.label}</p>
              <p className="text-white text-sm font-medium">{spec.value}</p>
            </motion.div>
          ))}
        </div>

        {specs.functions.length > 0 && (
          <div className="mt-12">
            <h3 className="text-white text-lg font-display mb-6">Functions & Complications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specs.functions.map((fn, idx) => (
                <motion.div
                  key={fn}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gold/5 border border-gold/15 rounded-lg p-4 text-center hover:bg-gold/10 transition-colors"
                >
                  <p className="text-white text-sm font-medium">{fn}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function ShippingInfo({ info }: { info: string }) {
  const items = [
    { icon: Truck, label: 'Complimentary Delivery', desc: info },
    { icon: Shield, label: 'Authenticity Guaranteed', desc: 'Certificate of authenticity with every purchase' },
    { icon: RotateCcw, label: '30-Day Returns', desc: 'Hassle-free returns on unworn timepieces' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {items.map(({ icon: Icon, label, desc }) => (
        <div key={label} className="flex gap-3 p-4 glass-surface luxury-border rounded-lg">
          <Icon size={20} className="text-gold flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-medium mb-1">{label}</p>
            <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
