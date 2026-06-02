import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import EducationExperience from "./components/EducationExperience";
import AllProjects from "./pages/AllProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StatsBar from "./components/StatsBar";
import Education from "./pages/Education"; // 🔥 ADD THIS

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ================= HOME PAGE ================= */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <StatsBar />
              <About />
              <Skills />
             
              <Projects />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* ================= ALL PROJECTS PAGE ================= */}
        <Route
          path="/projects"
          element={<AllProjects />}
        />

        {/* ================= EDUCATION NEW PAGE ================= */}
        <Route
          path="/education"
          element={<Education />}
        />

        {/* ================= 404 FALLBACK ================= */}
        <Route
          path="*"
          element={
            <div style={{ padding: "100px", textAlign: "center" }}>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;