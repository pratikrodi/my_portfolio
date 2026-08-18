'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#resume', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="text-lg font-bold tracking-tight text-white">PR<span className="text-[#63e6be]">.</span></a>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-[#63e6be]">{item.label}</a>)}
          <a href="#contact" className="rounded-full border border-[#63e6be]/50 px-4 py-2 text-[#63e6be] hover:bg-[#63e6be] hover:text-[#07111f]">Let&apos;s talk</a>
        </nav>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate-200 md:hidden">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {open && <nav className="border-t border-white/10 bg-[#0b192b] px-5 py-4 md:hidden">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-3 text-slate-200 hover:text-[#63e6be]">{item.label}</a>)}
      </nav>}
    </header>
  );
}
