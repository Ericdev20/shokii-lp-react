import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header, Footer } from './components/layout';
import { Hero, Features, About, HowItWorks, Download, Testimonials, Contact } from './components/sections';
import { KissPage } from './KissPage';
import { usePageMeta, useJsonLd } from './hooks';
import { SITE_META, KISS_META } from './constants';
import { LanguageProvider } from './context/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function PageMeta({ route }: { route: string }) {
  if (route === '/kiss') {
    usePageMeta({
      title: KISS_META.title,
      description: KISS_META.description,
      ogType: 'website',
      canonicalPath: '/kiss',
    });
  } else {
    usePageMeta({
      title: SITE_META.title,
      description: SITE_META.description,
      ogType: 'website',
      canonicalPath: '/',
    });
  }
  useJsonLd();
  return null;
}

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <HowItWorks />
        <Download />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<><PageMeta route="/" /><LandingPage /></>} />
        <Route path="/kiss" element={<><PageMeta route="/kiss" /><KissPage /></>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
