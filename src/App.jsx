
import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Admin from './pages/Admin';

// Mock initial data (replace with backend later)
const initialProducts = [
  {
    id: 1,
    name: 'PlayStation 5',
    type: 'Standard',
    price: 499.99,
    description: 'Next-gen gaming with 4K visuals and lightning-fast SSD.',
    image: '/products/ps5.jpg',
    postedDate: '2025-04-01',
  },
  {
    id: 2,
    name: 'PlayStation 5 Slim',
    type: 'Slim',
    price: 449.99,
    description: 'Compact design with the same powerful performance.',
    image: '/products/ps5-slim.jpg',
    postedDate: '2025-04-10',
  },
];

const initialBlogs = [
  {
    id: 1,
    title: 'Introducing PlayStation 5',
    excerpt: 'Discover the next generation of gaming with PS5.',
    postedDate: '2025-04-01',
  },
];

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
  const blogsRef = useRef(null);
  const [products, setProducts] = useState(initialProducts);
  const [blogs, setBlogs] = useState(initialBlogs);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Navbar
          scrollToSection={scrollToSection}
          refs={{ homeRef, aboutRef, servicesRef, contactRef, blogsRef }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex-grow">
                <section ref={homeRef} id="home" className="min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
                  <Home products={products} />
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
                <section ref={blogsRef} id="blogs" className="min-h-screen flex items-center bg-gray-900">
                  <Blogs blogs={blogs} />
                </section>
              </main>
            }
          />
          <Route
            path="/admin"
            element={
              <ErrorBoundary>
                <Admin products={products} setProducts={setProducts} blogs={blogs} setBlogs={setBlogs} />
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
