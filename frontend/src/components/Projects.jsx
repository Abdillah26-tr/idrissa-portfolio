import { useEffect, useState } from "react";
import { getProjects } from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState("all");
  const [flipped, setFlipped] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();
        setProjects(data);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* =========================
     FIXED CATEGORIES
  ========================= */
  const categories = [
    "all",
    "data analysis",
    "predictive modeling",
   
    "deep learning",
    "computer vision",
    "clustering",
    "web development",
    "others",
  ];

  const filter = (cat) => {
    setActive(cat);

    if (cat === "all") {
      setFiltered([]); // NO CARDS
    } else {
      setFiltered(
        projects.filter((p) => p.category === cat)
      );
    }
  };

  if (loading)
    return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">Projects</h2>

      {/* FILTERS */}
      <div className="project-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={
              active === c ? "filter-btn active" : "filter-btn"
            }
            onClick={() => filter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* MESSAGE OR GRID */}
      {active === "all" ? (
        <p className="category-message">
          Please choose a category
        </p>
      ) : (
        <div className="projects-grid">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`project-card ${
                flipped === project.id ? "flipped" : ""
              }`}
              onClick={() =>
                setFlipped(
                  flipped === project.id
                    ? null
                    : project.id
                )
              }
            >
              <div className="project-inner">

                {/* FRONT */}
                <div className="project-front">
                  <img
                    src={project.image}
                    className="project-image"
                  />

                  <div className="project-content">
                    <h3>{project.title}</h3>

                    <div className="tools">
                      {project.tools
                        .split(",")
                        .map((tool, i) => (
                          <span
                            key={i}
                            className="tool-tag"
                          >
                            {tool.trim()}
                          </span>
                        ))}
                    </div>

                    <div className="links">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          GitHub
                        </a>
                      )}

                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          Live
                        </a>
                      )}
                    </div>

                    <small className="date">
                      {new Date(
                        project.created_at
                      ).toLocaleDateString()}
                    </small>

                    <div className="hover-text">
                      Click me for description
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="project-back">
                  <h3>{project.title}</h3>
                  <p className="desc">
                    {project.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;