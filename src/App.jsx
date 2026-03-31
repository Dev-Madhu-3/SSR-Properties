import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import HeroDetail from "./sections/HeroDetail";
import FeaturedSlider from "./sections/FeaturedSlider";
import About from "./sections/About";
import AboutDetail from "./sections/AboutDetail";
import ProjectDetail from "./sections/ProjectDetail";
import Projects from "./sections/Projects";
import Blog from "./sections/Blog";
import BlogPostDetail from "./sections/BlogPostDetail";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ModalOverlay from "./components/ModalOverlay";
import { ModalProvider } from "./contexts/ModalContext";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [viewingPostId, setViewingPostId] = useState(null);
  const [viewingAbout, setViewingAbout] = useState(false);
  const [viewingHero, setViewingHero] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "blog", "contact"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ModalProvider>
      <>
        <Helmet>
          <title>SSR Properties | Luxury Real Estate Developer in India</title>
          <meta
            name="description"
            content="SSR Properties - Leading real estate developer in India offering luxury villas, premium apartments, and smart investment opportunities."
          />
        </Helmet>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-4xl font-bold text-[#c89b3c]"
              >
                SSR Properties
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && (
          <div className="min-h-screen bg-white">
            <Navbar activeSection={activeSection} />

            {viewingHero ? (
              <main>
                <HeroDetail onBack={() => setViewingHero(false)} />
              </main>
            ) : viewingPostId ? (
              <main>
                <BlogPostDetail
                  postId={viewingPostId}
                  onBack={() => setViewingPostId(null)}
                />
              </main>
            ) : viewingAbout ? (
              <main>
                <AboutDetail onBack={() => setViewingAbout(false)} />
              </main>
            ) : (
              <main>
                <section id="home">
                  <Hero onViewHero={() => setViewingHero(true)} />
                  <FeaturedSlider />
                </section>

                <section id="about">
                  <About onViewAbout={() => setViewingAbout(true)} />
                  <ProjectDetail />
                </section>

                <section id="projects">
                  <Projects />
                </section>

                <section id="blog">
                  <Blog />
                </section>

                <section id="contact">
                  <Contact />
                </section>
              </main>
            )}

            <Footer />
            <ScrollToTop />
          </div>
        )}

        <ModalOverlay />
      </>
    </ModalProvider>
  );
}

export default App;
