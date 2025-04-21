import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inventory from './pages/Inventory';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Tutorials from './pages/Tutorials';
import Admin from './pages/Admin';
import { fetchProducts, fetchTutorials } from './services/api';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="container mx-auto p-4 text-white">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const tutorialsRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchProducts();
        const tutorialsData = await fetchTutorials();
        setProducts(productsData);
        setTutorials(tutorialsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Navbar
          scrollToSection={scrollToSection}
          refs={{ homeRef, aboutRef, servicesRef, contactRef, tutorialsRef }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex-grow">
                <section ref={homeRef} id="home" className="min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
                  <Inventory products={products} setProducts={setProducts} />
                </section>
                <section ref={aboutRef} id="about" className="min-h-screen flex items-center bg-gray-800">
                  <About />
                </section>
                <section ref={servicesRef} id="services" className="min-h-screen flex items-center bg-gray-900">
                  <Services />
                </section>
                <section ref={contactRef} id="contact" className="min-h-screen flex items-center bg-gray-800">
                  <Contact />
                </section>
                <section ref={tutorialsRef} id="tutorials" className="min-h-screen flex items-center bg-gray-900">
                  <Tutorials tutorials={tutorials} />
                </section>
              </main>
            }
          />
          <Route
            path="/admin"
            element={
              <ErrorBoundary>
                <Admin products={products} setProducts={setProducts} tutorials={tutorials} setTutorials={setTutorials} />
              </ErrorBoundary>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;