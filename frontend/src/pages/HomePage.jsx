import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <section id="home">
        <Hero />
      </section>

      {/* ================= STATS BAR ================= */}
      <StatsBar />

      {/* ================= ABOUT ================= */}
      <section id="about">
        <About />
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills">
        <Skills />
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects">
        <Projects />
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact">
        <Contact />
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}

export default Home;