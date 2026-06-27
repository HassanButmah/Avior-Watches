'use client';

import type { FormEvent } from 'react';

export default function ContactForm() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] border border-white/10 bg-carbon-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="Name" className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold" />
        <input placeholder="Email" type="email" className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold" />
      </div>
      <input placeholder="Subject" className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold" />
      <textarea rows={7} placeholder="Message" className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold" />
      <button type="submit" className="btn-gold rounded-full px-5 py-3 text-sm">
        Send message
      </button>
    </form>
  );
}

