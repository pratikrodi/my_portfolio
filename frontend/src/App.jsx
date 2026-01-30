import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Linkedin, Github, Download,
  Code, Server, Database, Cloud, Award,
  Briefcase, GraduationCap, ChevronRight
} from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const response = await fetch(
        'https://my-portfolio-backend-ca56.onrender.com/api/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: 'Finanza',
      subtitle: 'Financial Advisory Appointment Booking System',
      tech: 'MERN Stack',
      description:
        'Built an advisor–client appointment scheduling platform improving workflow efficiency by 25%.',
      highlights: ['25% efficiency', 'Responsive UI', 'Optimized APIs']
    },
    {
      title: 'Catchy',
      subtitle: 'Online Product Order and Delivery System',
      tech: 'Python, Django',
      description:
        'Developed an online product delivery system with enhanced UX and home delivery features.',
      highlights: ['Home Delivery', 'Enhanced UX', 'Scalable Backend']
    }
  ];

  const skills = {
    Frontend: ['React.js', 'JavaScript', 'HTML/CSS'],
    Backend: ['Node.js', 'Python', 'FastAPI'],
    Database: ['SQL', 'MongoDB'],
    Cloud: ['AWS EC2', 'S3', 'IAM', 'CloudWatch', 'Jenkins'],
    DevOps: ['Docker', 'Kubernetes', 'Terraform', 'Ansible'],
    Tools: ['Git', 'GitHub']
  };

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Matfly Solutions',
      period: '05/2025 - Present',
      location: 'Pune, India',
      achievements: [
        'Building and maintaining full-stack web applications',
        'Deploying and managing applications on AWS',
        'Monitoring systems using CloudWatch'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Acute Solution Pvt. Ltd.',
      period: '02/2024 - 04/2025',
      location: 'Pune, India',
      achievements: [
        'Optimized ERP platform performance by 25%',
        'Improved inventory workflow accuracy by 30%',
        'Increased organic traffic by 20%'
      ]
    }
  ];

  const cardStyle =
    'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/30 hover:border-cyan-400/40 transition-all duration-300';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PR
          </h1>
          <div className="flex gap-6">
            {['home','about','experience','projects','skills','contact'].map(sec => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`capitalize transition-colors hover:text-cyan-400 ${
                  activeSection === sec ? 'text-cyan-400' : 'text-slate-300'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-6">
        <div className="text-center max-w-4xl">
          <div className="relative w-36 h-36 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-cyan-500/40 blur-3xl"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-5xl font-bold shadow-xl">
              PR
            </div>
          </div>

          <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Pratik Rodi
          </h1>

          <h2 className="text-3xl text-cyan-400 mt-4 mb-6">
            Full Stack Developer
          </h2>

          <p className="text-slate-300 text-xl leading-relaxed mb-10">
            Full Stack Developer experienced in React, Node, Python, AWS and DevOps,
            focused on building scalable and reliable systems.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="/Pratik_Rodi_9767597682.pdf"
              download
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 hover:shadow-cyan-500/40 transition-all shadow-lg"
            >
              <Download className="inline mr-2" size={18} />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-title">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">About Me</h2>
          <div className={cardStyle + ' p-8'}>
            <p className="text-slate-300 leading-relaxed mb-6">
              I’m a passionate Full Stack Developer with experience building
              enterprise-level web applications using modern technologies.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <GraduationCap className="text-cyan-400" />
                <div>
                  <h3 className="font-semibold">Education</h3>
                  <p className="text-slate-300">MCA – Sinhgad Institute</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Award className="text-cyan-400" />
                <div>
                  <h3 className="font-semibold">Certifications</h3>
                  <p className="text-slate-300">Google Cloud, Python, Java</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-title">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Experience</h2>
          <div className="space-y-8">
            {experience.map((job, i) => (
              <div key={i} className={cardStyle + ' p-8'}>
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{job.title}</h3>
                    <p className="text-slate-300">{job.company}</p>
                  </div>
                  <Briefcase className="text-cyan-400" />
                </div>
                <p className="text-slate-400 mb-4">{job.period} • {job.location}</p>
                <ul className="space-y-2">
                  {job.achievements.map((a, idx) => (
                    <li key={idx} className="flex gap-2 text-slate-300">
                      <ChevronRight className="text-cyan-400" size={18} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-title">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <div key={i} className={cardStyle + ' p-8 hover:-translate-y-1'}>
                <h3 className="text-2xl font-bold text-cyan-400">{p.title}</h3>
                <p className="text-slate-400">{p.subtitle}</p>
                <p className="text-blue-400 text-sm mb-4">{p.tech}</p>
                <p className="text-slate-300 mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full bg-slate-800/80 border border-slate-700 hover:border-cyan-400 transition"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-title">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className={cardStyle + ' p-6'}>
                <h3 className="font-bold mb-4">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm bg-slate-800/80 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-title">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title">Contact</h2>
          <div className={cardStyle + ' p-8'}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition shadow-lg"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-slate-400">
        © 2025 Pratik Rodi · Built with React & FastAPI
      </footer>
    </div>
  );
}
