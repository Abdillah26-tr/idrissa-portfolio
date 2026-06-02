import { useEffect, useState } from "react"
import { getEducation, getExperience } from "../api/api"

function EducationExperience() {

    const [education, setEducation] = useState([])
    const [experience, setExperience] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadData() {
            try {

                const edu = await getEducation()
                const exp = await getExperience()

                setEducation(Array.isArray(edu) ? edu : [])
                setExperience(Array.isArray(exp) ? exp : [])

            } catch (error) {
                console.log("API ERROR:", error)
                setEducation([])
                setExperience([])
            } finally {
                setLoading(false)
            }
        }

        loadData()

    }, [])

    if (loading) {
        return (
            <div style={{
                textAlign: "center",
                padding: "60px",
                fontSize: "18px"
            }}>
                Loading...
            </div>
        )
    }

    return (
        <section className="edu-exp">

            {/* HEADER */}
            <div className="edu-head">
                <span>CAREER JOURNEY</span>
                <h2>Education & Experience</h2>
            </div>

            {/* CONTAINER */}
            <div className="edu-container">

                {/* ================= EDUCATION ================= */}
                <div className="edu-box">

                    <h3>Education</h3>

                    {education.length === 0 ? (
                        <p>No education data</p>
                    ) : (
                        education.map((item) => (
                            <div key={item.id} className="edu-card">

                                <h4>{item.institution}</h4>

                                <p className="role">{item.course}</p>

                                <p className="year">
                                    {item.start_year} - {item.end_year}
                                </p>

                                <p className="desc">
                                    {item.description}
                                </p>

                            </div>
                        ))
                    )}

                </div>

                {/* ================= EXPERIENCE ================= */}
                <div className="edu-box">

                    <h3>Experience & Volunteer</h3>

                    {experience.length === 0 ? (
                        <p>No experience data</p>
                    ) : (
                        experience.map((item) => (
                            <div key={item.id} className="edu-card">

                                <h4>{item.company}</h4>

                                <p className="role">{item.role}</p>

                                <p className="year">
                                    {item.start_year} - {item.end_year ?? "Present"}
                                </p>

                                <p className="desc">
                                    {item.description}
                                </p>

                            </div>
                        ))
                    )}

                </div>

            </div>

        </section>
    )
}

export default EducationExperience