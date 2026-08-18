import HomeSection from './components/Home';
import AboutSection from './components/About';
import ResumeSection from './components/Resume';
import ProjectsSection from './components/Projects';
import ContactSection from './components/Contact';

export default function Home() {
  return <main><HomeSection /><AboutSection /><ResumeSection /><ProjectsSection /><ContactSection /></main>;
}
