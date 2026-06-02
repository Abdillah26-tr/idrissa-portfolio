import { useEffect, useState } from "react";
import { getAbout } from "../api/api";
import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const [open, setOpen] = useState(false);
  const [about, setAbout] = useState(null);
  const [hover, setHover] = useState(false);

  const [active, setActive] = useState("home");

  const location = useLocation();

  // ================= LOAD ABOUT =================
  useEffect(() => {

    async function loadData() {
      try {
        const data = await getAbout();
        setAbout(data[0]);
      } catch (err) {
        console.log("Navbar API error:", err);
      }
    }

    loadData();

  }, []);

  // ================= SCROLL SPY =================
  useEffect(() => {

    const sections = ["home", "about", "skills", "contact"];

    const handleScroll = () => {

      let current = "home";

      sections.forEach((id) => {

        const el = document.getElementById(id);

        if (el) {

          const top = el.offsetTop - 120;
          const height = el.offsetHeight;

          if (
            window.scrollY >= top &&
            window.scrollY < top + height
          ) {
            current = id;
          }
        }

      });

      setActive(current);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener("scroll", handleScroll);

  }, [location.pathname]);

  // ================= ACTIVE CLASS =================
  const navClass = (section) => {

    if (section === "education") {
      return location.pathname === "/education"
        ? "nav-link-custom active-link"
        : "nav-link-custom";
    }

    return location.pathname === "/"
      ? `nav-link-custom ${active === section ? "active-link" : ""}`
      : "nav-link-custom";
  };

  return (

    <nav
      className="navbar fixed-top custom-navbar"
      style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(15,23,42,0.08)",
        transition: "0.3s"
      }}
    >

      <div className="container nav-container">

        {/* ================= BRAND ================= */}
        <div className="brand-wrap">

          {about && (
            <img
              src={about.header_image}
              alt="logo"
              className="nav-profile"
            />
          )}

          <div className="brand">
            <span
              style={{
                fontFamily: "'Imprint MT Shadow', serif",
                fontStyle: "italic",
                fontSize: "22px",
                color: "#0f172a"
              }}
            >
              Idrissa
            </span>
          </div>

        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="d-none d-md-flex nav-center">

          <a href="/#home" className={navClass("home")}>
            Home
          </a>

          <a href="/#about" className={navClass("about")}>
            About
          </a>

          <a href="/#skills" className={navClass("skills")}>
            Skills
          </a>

          <Link to="/education" className={navClass("education")}>
            Education
          </Link>

          <a href="/#contact" className={navClass("contact")}>
            Contact
          </a>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="nav-right">

          <a
            href="/#contact"
            className="hire-btn"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              background: hover ? "#38bdf8" : "#0f172a",
              color: "white",
              padding: "7px 16px",
              borderRadius: "25px",
              fontSize: "13px",
              textDecoration: "none",
              transition: "0.35s",
              transform: hover ? "scale(1.08)" : "scale(1)",
              boxShadow: hover
                ? "0 0 15px rgba(56,189,248,0.6)"
                : "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            Hire Me
          </a>

          <button
            className="mobile-toggle d-md-none"
            onClick={() => setOpen(!open)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (

        <div className="mobile-menu">

          <a href="/#home" className={navClass("home")} onClick={() => setOpen(false)}>
            Home
          </a>

          <a href="/#about" className={navClass("about")} onClick={() => setOpen(false)}>
            About
          </a>

          <a href="/#skills" className={navClass("skills")} onClick={() => setOpen(false)}>
            Skills
          </a>

          <Link to="/education" className={navClass("education")} onClick={() => setOpen(false)}>
            Education
          </Link>

          <a href="/#contact" className={navClass("contact")} onClick={() => setOpen(false)}>
            Contact
          </a>

        </div>

      )}

    </nav>

  );
}

export default Navbar;