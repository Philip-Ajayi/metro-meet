import type { Metadata } from 'next';
import './globals.css';
import Cursor from './components/Cursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import AnimatedBackground from './components/AnimatedBackground';

export const metadata: Metadata = {
  title: 'Metro Meet 4.0 – Money Matters',
  description: 'Join us for the 4th edition of Metro Meet themed Money Matters. Turning ideas into income.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-metro-dark text-white overflow-x-hidden">
        <AnimatedBackground />
        <Cursor />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}