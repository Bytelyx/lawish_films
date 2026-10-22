import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LenisProvider } from './hooks/useLenis';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { CategoryDetails } from './pages/CategoryDetails';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:id" element={<CategoryDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <LenisProvider>
        <ScrollToTop />
        <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] overflow-x-hidden selection:bg-[#c5a880]/30 selection:text-white flex flex-col justify-between">
          <Navbar />
          <main className="flex-1 w-full">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
