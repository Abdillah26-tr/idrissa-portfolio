import { useEffect, useState } from "react";
import { getAbout } from "../api/api";

function About() {

    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadData() {
            try {
                const data = await getAbout();

                if (Array.isArray(data) && data.length > 0) {
                    setAbout(data[0]);
                } else {
                    setError("No about data found");
                }

            } catch (err) {
                console.log("About API error:", err);
                setError("Failed to load about data");
            } finally {
                setLoading(false);
            }
        }

        loadData();

    }, []);

    // LOADING
    if (loading) {
        return (
            <div className="loading">
                Loading About...
            </div>
        );
    }

    // ERROR
    if (error) {
        return (
            <div className="error">
                {error}
            </div>
        );
    }

    // SAFETY CHECK
    if (!about) return null;

    return (

        <section id="about" className="about">

            {/* HEADER */}
            <div className="about-head">

                <span className="about-label">
                    About Me
                </span>

                <h2 className="about-title">
                    {about.title || "About Me"}
                </h2>

            </div>

            {/* MAIN CONTENT */}
            <div className="about-container">

                {/* IMAGE */}
                <div className="about-image">

                    <img
                        src={about.about_image}
                        alt={about.full_name || "About image"}
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = "/default-profile.png";
                        }}
                    />

                </div>

                {/* TEXT */}
                <div className="about-text">

                    <h3>Who I Am</h3>

                    <p>
                        {about.bio}
                    </p>

                    {/* INFO GRID */}
                    <div className="about-grid">

                        <div className="about-card">
                            <span className="card-tag">Education</span>
                            <p>BSc in Data Science</p>
                        </div>

                        <div className="about-card">
                            <span className="card-tag">Specialization</span>
                            <p>Data Scientist & ML Engineer</p>
                        </div>

                        <div className="about-card">
                            <span className="card-tag">Location</span>
                            <p>{about.location}</p>
                        </div>

                        <div className="about-card">
                            <span className="card-tag">Contact</span>
                            <p>{about.email}</p>
                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default About;s