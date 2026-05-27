'use client';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FocusSection from './components/FocusSection';
import SpeakerSection from './components/SpeakerSection';
import GallerySection from './components/GallerySection';
import RegistrationSection from './components/RegistrationSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <AboutSection />
      <FocusSection />
      <SpeakerSection />
      <GallerySection />
      <RegistrationSection />
      <FAQSection />
      <ContactSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}