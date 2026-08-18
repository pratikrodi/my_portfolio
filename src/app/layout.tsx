import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Pratik Rodi | Full Stack Developer',
  description: 'Portfolio of Pratik Rodi, a full stack developer building thoughtful digital products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><div className="pt-16">{children}</div></body></html>;
}
