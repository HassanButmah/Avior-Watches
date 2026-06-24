'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to send message');
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4">Contact Us</p>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Get in Touch</h1>
            <p className="text-white/50 max-w-lg mx-auto">We&apos;d love to hear from you. Contact us for any inquiries.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'contact@aviorprestige.com' },
                { icon: Phone, label: 'Phone', value: '+970 123 456 789' },
                { icon: MapPin, label: 'Location', value: 'Palestine' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-surface luxury-border rounded-lg p-8 text-center"
                >
                  <CheckCircle size={48} className="text-gold mx-auto mb-4" />
                  <h2 className="font-display text-2xl text-white mb-2">Message Sent</h2>
                  <p className="text-white/60 text-sm">Thank you. We will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-gold text-xs tracking-wider uppercase hover:text-gold-light">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="glass-surface luxury-border rounded-lg p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Name" error={errors.name?.message}>
                      <input {...register('name')} className={inputClass} placeholder="Your name" aria-invalid={!!errors.name} />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <input {...register('email')} type="email" className={inputClass} placeholder="your@email.com" aria-invalid={!!errors.email} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone" error={errors.phone?.message}>
                      <input {...register('phone')} className={inputClass} placeholder="Optional" />
                    </Field>
                    <Field label="Subject" error={errors.subject?.message}>
                      <input {...register('subject')} className={inputClass} placeholder="How can we help?" aria-invalid={!!errors.subject} />
                    </Field>
                  </div>
                  <Field label="Message" error={errors.message?.message}>
                    <textarea {...register('message')} rows={5} className={`${inputClass} resize-none`} placeholder="Your message..." aria-invalid={!!errors.message} />
                  </Field>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    <Send size={16} />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const inputClass =
  'w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition-colors';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
