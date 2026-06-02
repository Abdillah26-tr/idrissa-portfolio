import { useEffect, useState } from "react"
import { getProjects } from "../api/api"
import "./AllProjects.css"

function Projects() {

    const [projects, setProjects] = useState([])
    const [filtered, setFiltered] = useState([])
    const [active, setActive] = useState("all")
    const [flipped, setFlipped] = useState(null)

    useEffect(() => {

        async function load() {

            const data = await getProjects()

            setProjects(data)
            setFiltered(data)

        }

        load()

    }, [])

    // FILTER
    function filterProjects(category) {

        setActive(category)

        if (category === "all") {
            setFiltered(projects)
        } else {
            setFiltered(
                projects.filter(p => p.category === category)
            )
        }
    }

    // FLIP
    function handleFlip(id) {

        setFlipped(flipped === id ? null : id)

    }

    // FIX URL FUNCTION
    const fixUrl = (url) => {
        if (!url) return null
        return url.startsWith("http") ? url : `https://${url}`
    }

    return (

        <section className="projects">

            {/* HEADER */}
            <div className="projects-head">

                <span>MY WORK</span>

                <h2>Projects</h2>

            </div>

            {/* FILTER */}
            <div className="filter-bar">

                {[
                    "all",
                    "data analysis",
                    "predictive modeling",
                    "machine learning",
                    "deep learning",
                    "computer vision",
                    "clustering",
                    "web development",
                    "others"
                ].map((cat) => (

                    <button
                        key={cat}
                        className={`filter-btn ${active === cat ? "active" : ""}`}
                        onClick={() => filterProjects(cat)}
                    >
                        {cat}
                    </button>

                ))}

            </div>

            {/* GRID */}
            <div className="projects-grid">

                {filtered.map((project) => (

                    <div
                        key={project.id}
                        className={`card ${flipped === project.id ? "flipped" : ""}`}
                        onClick={() => handleFlip(project.id)}
                    >

                        <div className="card-inner">

                            {/* FRONT */}
                            <div className="card-front">

                                <img src={project.image} alt={project.title} />

                                <h3>{project.title}</h3>

                                {/* TOOLS */}
                                <div className="tools">

                                    {project.tools?.split(",").map((t, i) => (
                                        <span key={i}>{t.trim()}</span>
                                    ))}

                                </div>

                                {/* LINKS (FIXED) */}
                                <div className="links">

                                    {/* LIVE */}
                                    {fixUrl(project.live_link) && (
                                        <a
                                            href={fixUrl(project.live_link)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Live
                                        </a>
                                    )}

                                    {/* GITHUB */}
                                    {fixUrl(project.github_link) && (
                                        <a
                                            href={fixUrl(project.github_link)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Code
                                        </a>
                                    )}

                                </div>

                                <div className="hint">
                                    Click for details
                                </div>

                            </div>

                            {/* BACK */}
                            <div className="card-back">

                                <h3>{project.title}</h3>

                                <p>{project.description}</p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    )
}

export default Projects