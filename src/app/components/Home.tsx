'use client';

import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';
import { FaArrowDown, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function HomeSection() {
  return <section id="home" className="relative overflow-hidden bg-[#07111f]">
    <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#63e6be]/10 blur-3xl" />
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
      <div className="relative">
        <p className="mb-5 font-mono text-sm uppercase tracking-[.22em] text-[#63e6be]">Hello, I&apos;m Pratik</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">I build digital products that <span className="text-[#63e6be]">feel effortless.</span></h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">Full stack developer focused on clear interfaces, reliable systems, and the small details that make software a joy to use.</p>
        <p className="mt-5 font-mono text-sm text-slate-300"><span className="text-[#63e6be]">Currently:</span> <Typewriter words={['shipping with React', 'building with Node.js', 'learning in public']} loop cursor typeSpeed={55} deleteSpeed={35} /></p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#projects" className="rounded-full bg-[#63e6be] px-6 py-3 text-sm font-bold text-[#07111f] hover:-translate-y-0.5 hover:bg-[#8af2d0]">See my work <FaArrowDown className="ml-2 inline" /></a>
          <a href="#contact" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-[#63e6be] hover:text-[#63e6be]">Get in touch</a>
        </div>
        <div className="mt-10 flex gap-5 text-slate-400"><a href="https://github.com" aria-label="GitHub" className="hover:text-[#63e6be]"><FaGithub /></a><a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-[#63e6be]"><FaLinkedinIn /></a><a href="https://twitter.com" aria-label="Twitter" className="hover:text-[#63e6be]"><FaTwitter /></a></div>
      </div>
      <div className="relative mx-auto w-full max-w-xs">
        <div className="absolute -inset-3 rounded-[2rem] border border-[#63e6be]/20 rotate-6" />
        <Image src="/images/file_000000002988820886422f1a227ff7d6.png" alt="Pratik Rodi" width={520} height={520} priority className="relative aspect-square w-full rounded-[2rem] object-cover grayscale-[15%]" />
        <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-[#10243a] px-4 py-3 shadow-xl"><p className="font-mono text-xs text-[#63e6be]">5+ years</p><p className="text-sm text-white">building for the web</p></div>
      </div>
    </div>
  </section>;
}
