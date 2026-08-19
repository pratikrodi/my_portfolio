'use client';

import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaPhone } from 'react-icons/fa';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSent(false);
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!response.ok) throw new Error('Message failed');
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  return <section id="contact" className="bg-[#07111f] px-5 py-24 sm:px-8"><div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono text-sm text-[#63e6be]">04 / contact</p><h2 className="mt-5 text-4xl font-bold text-white sm:text-6xl">Let&apos;s make something <span className="text-[#63e6be]">great.</span></h2><p className="mt-6 max-w-md leading-7 text-slate-400">Have an idea, a question, or want to work together? My inbox is open.</p><div className="mt-8 space-y-4 text-sm text-slate-300"><a className="flex items-center gap-3 hover:text-[#63e6be]" href="mailto:prateekrodi@gmail.com"><FaEnvelope className="text-[#63e6be]" /> prateekrodi@gmail.com</a><a className="flex items-center gap-3 hover:text-[#63e6be]" href="tel:+919767597682"><FaPhone className="text-[#63e6be]" /> +91 97675 97682</a><p className="text-slate-400">Pune, India</p><div className="flex gap-5 pt-3 text-lg"><a href="https://github.com" aria-label="GitHub" className="hover:text-[#63e6be]"><FaGithub /></a><a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-[#63e6be]"><FaLinkedinIn /></a></div></div></div><form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#0b192b] p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-slate-300">Name<input name="name" value={formData.name} onChange={update} required disabled={status === 'sending'} className="mt-2 w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none focus:border-[#63e6be] disabled:opacity-60" /></label><label className="text-sm text-slate-300">Email<input type="email" name="email" value={formData.email} onChange={update} required disabled={status === 'sending'} className="mt-2 w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none focus:border-[#63e6be] disabled:opacity-60" /></label></div><label className="mt-5 block text-sm text-slate-300">Message<textarea name="message" value={formData.message} onChange={update} required disabled={status === 'sending'} rows={5} className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none focus:border-[#63e6be] disabled:opacity-60" /></label><button type="submit" disabled={status === 'sending'} className="mt-6 rounded-full bg-[#63e6be] px-6 py-3 text-sm font-bold text-[#07111f] hover:bg-[#8af2d0] disabled:cursor-not-allowed disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send message'}</button>{sent && <p className="mt-4 text-sm text-[#63e6be]">Thanks — I&apos;ll get back to you soon.</p>}{status === 'error' && <p className="mt-4 text-sm text-red-300">Your message could not be sent. Please try again.</p>}</form></div><footer className="mx-auto mt-20 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">© {new Date().getFullYear()} Pratik Rodi. Crafted with care.</footer></section>;
}
