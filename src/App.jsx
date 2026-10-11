import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { BookingProvider } from './context/BookingContext';
import Header from './components/Header';
import ActionDock from './components/ActionDock';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Container, Button } from './components/ui';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

const titles = {
  '/': 'M. Aggarwal & Co. | Chartered Accountants, Jaipur',
  '/services': 'Services | M. Aggarwal & Co., Chartered Accountants',
  '/about': 'About the firm | M. Aggarwal & Co., Chartered Accountants',
  '/contact': 'Contact | M. Aggarwal & Co., Chartered Accountants',
};

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = titles[pathname] || titles['/'];
    if (hash) {
      // wait a frame so the target section exists
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <Container className="py-32 text-center">
      <h1 className="text-5xl">Page not found</h1>
      <p className="mt-4 text-[17px] text-[var(--color-ink-soft)]">The page you were looking for has moved or never existed.</p>
      <Button to="/" className="mt-8">Back to home</Button>
    </Container>
  );
}

function App() {
  return (
    <BookingProvider>
      <RouteEffects />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-[var(--color-cobalt)] focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ActionDock />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}

export default App;
