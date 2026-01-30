import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Download, Code, Server, Database, Cloud, Award, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await fetch('https://my-portfolio-backend-ca56.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
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
      description: 'Built an advisor–client appointment scheduling platform improving workflow efficiency by 25%. Implemented responsive UI with optimized API calls for seamless performance.',
      highlights: ['25% efficiency improvement', 'Responsive UI', 'Optimized APIs']
    },
    {
      title: 'Catchy',
      subtitle: 'Online Product Order and Delivery System',
      tech: 'Python, Django',
      description: 'Developed an online product delivery system, enhancing user experience and increasing platform efficiency by 25%. Generated daily Product Delivering system, enabling services like Home Delivery.',
      highlights: ['25% efficiency boost', 'Home Delivery System', 'Enhanced UX']
    }
  ];

  const skills = {
    'Frontend': ['React.js', 'JavaScript', 'HTML/CSS'],
    'Backend': ['Node.js', 'Python', 'FastAPI', 'Django', 'PHP'],
    'Database': ['SQL', 'MongoDB'],
    'Cloud & DevOps': ['AWS EC2', 'S3', 'IAM', 'CloudWatch', 'SNS', 'Jenkins'],
    'Tools': ['Git', 'GitHub']
  };

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Matfly Solutions',
      period: '05/2025 - Present',
      location: 'Pune, India',
      achievements: [
        'Building and maintaining full-stack web applications across frontend and backend.',
        'Integrating APIs and databases to ensure smooth data flow.',
        'Deploying and managing applications on AWS (EC2, S3, IAM, VPC, RDS, Route 53) for scalability and reliability.',
        'Monitoring systems using CloudWatch logs, metrics, and alarms to ensure optimal performance.'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Acute Solution Pvt. Ltd.',
      period: '02/2024 - 04/2025',
      location: 'Pune, India',
      achievements: [
        'Optimized ERP platform performance by 25% using PHP, HTML, CSS, React and JavaScript',
        'Improved inventory workflow accuracy by 30% through enhanced data validation',
        'Implemented SEO strategies, increasing organic website traffic by 20%',
        'Reduced defects by 15% and improved load time by 20% through comprehensive testing'
      ]
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Paarsh Infotech Pvt. Ltd.',
      period: '11/2023 - 01/2024',
      location: 'Nashik, India (Remote)',
      achievements: [
        'Built scalable full-stack application using React.js and Node.js',
        'Integrated third-party APIs to enhance business logic',
        'Improved UI responsiveness, increasing satisfaction by 15%'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PR
          </h1>
          <div className="flex gap-6">
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize hover:text-cyan-400 transition-colors ${
                  activeSection === section ? 'text-cyan-400' : 'text-slate-300'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-5xl font-bold mb-6">
              PR
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Pratik Rodi
          </h1>
          <h2 className="text-3xl text-cyan-400 mb-6">Full Stack Developer</h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
           Full Stack Developer with experience building frontend and backend web applications, 
           integrating APIs, and working with databases. Skilled in deploying and supporting applications on AWS, 
           with working knowledge of Linux, monitoring, and troubleshooting . Familiar with DevOps basics including 
           Docker - Kubernetes, Jenkins, Terraform , and Ansible , and focused on delivering scalable, reliable solutions.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <a href="mailto:prateekrodi@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <Mail size={20} />
              prateekrodi@gmail.com
            </a>
            <a href="tel:+919767597682" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <Phone size={20} />
              +91 9767597682
            </a>
            <span className="flex items-center gap-2 text-slate-300">
              <MapPin size={20} />
              Pune
            </span>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="https://linkedin.com/in/pratik-rodi-a75760247" target="_blank" rel="noopener noreferrer" 
               className="p-3 bg-slate-800 rounded-lg hover:bg-cyan-600 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/pratikrodi" target="_blank" rel="noopener noreferrer"
               className="p-3 bg-slate-800 rounded-lg hover:bg-cyan-600 transition-colors">
              <Github size={24} />
            </a>
            <a href="/Pratik_Rodi_9767597682.pdf" download="Pratik_Rodi_9767597682.pdf" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold">
              <Download size={20} />
                Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I'm a passionate Full Stack Developer with a Master's in Computer Applications and over a year of 
              professional experience building enterprise-level applications. My expertise spans across modern 
              web technologies, cloud infrastructure, and software quality assurance.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I specialize in creating scalable, performant web applications using React, Node.js, Python, and 
              cloud services. I've successfully optimized ERP platforms, improved workflow accuracy, and 
              implemented SEO strategies that drove significant business results.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-4">
                <GraduationCap className="text-cyan-400 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Education</h3>
                  <p className="text-slate-300">MCA - Sinhgad Institute of Management (CGPA: 8.06/10)</p>
                  <p className="text-slate-400 text-sm">2022 - 2024</p>
                  <p className="text-slate-300 mt-2">BSc CS - Hislop College, Nagpur (CGPA: 7.37/10)</p>
                  <p className="text-slate-400 text-sm">2019 - 2022</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="text-cyan-400 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Certifications</h3>
                  <p className="text-slate-300">Automation Testing Basics - Simplilearn</p>
                  <p className="text-slate-300">Google Cloud Computing - NPTEL</p>
                  <p className="text-slate-300">Python, Java, C++ - ETH Research Lab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Work Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700 hover:border-cyan-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{job.title}</h3>
                    <p className="text-xl text-slate-300">{job.company}</p>
                  </div>
                  <Briefcase className="text-cyan-400" size={32} />
                </div>
                <p className="text-slate-400 mb-4">{job.period} • {job.location}</p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <ChevronRight className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700 hover:border-cyan-600 transition-all hover:transform hover:scale-105">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-3">{project.subtitle}</p>
                <p className="text-sm text-blue-400 font-semibold mb-4">{project.tech}</p>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((highlight, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  {category === 'Frontend' && <Code className="text-cyan-400" size={24} />}
                  {category === 'Backend' && <Server className="text-cyan-400" size={24} />}
                  {category === 'Database' && <Database className="text-cyan-400" size={24} />}
                  {category === 'Cloud & DevOps' && <Cloud className="text-cyan-400" size={24} />}
                  <h3 className="text-xl font-bold">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-700 rounded-lg text-sm text-slate-300 hover:bg-cyan-600 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'success' && (
                <p className="text-green-400 text-center">Message sent successfully!</p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-400 text-center">Failed to send. Make sure the backend is running.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 text-center text-slate-400">
        <p>© 2025 Pratik Rodi. Built with React & FastAPI</p>
      </footer>
    </div>
  );
}