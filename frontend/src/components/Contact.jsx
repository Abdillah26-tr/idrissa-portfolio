import { useState } from "react"
import { FaEnvelope, FaPhone, FaLocationDot, FaBriefcase } from "react-icons/fa6"

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")

    // HANDLE INPUT
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // SUBMIT FORM
    async function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)
        setResponse("")

        try {
            const res = await fetch("http://127.0.0.1:8000/api/contact/send/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.status === "success") {
                setResponse("Message sent successfully ")

                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                })
            } else {
                setResponse("Failed to send message ")
            }

        } catch (error) {
            setResponse("Server error ")
        }

        setLoading(false)
    }

    return (
        <section className="contact" id="contact">

            {/* HEADER */}
            <div className="contact-heading">
                <span>GET IN TOUCH</span>
                <h2>Contact Me</h2>
            </div>

            <div className="contact-container">

                {/* LEFT */}
                <div className="contact-info">

                    <div className="info-box">
                        <FaEnvelope className="info-icon" />
                        <div>
                            <h4>Email</h4>
                            <p>idrissafakiyahya2003@gmail.com</p>
                        </div>
                    </div>

                    <div className="info-box">
                        <FaPhone className="info-icon" />
                        <div>
                            <h4>Phone</h4>
                            <p>+255 655 132 389</p>
                            <p>+255 622 923 299</p>
                        </div>
                    </div>

                    <div className="info-box">
                        <FaLocationDot className="info-icon" />
                        <div>
                            <h4>Location</h4>
                            <p>Dar es Salaam, Tanzania</p>
                        </div>
                    </div>

                    <div className="info-box">
                        <FaBriefcase className="info-icon" />
                        <div>
                            <h4>Availability</h4>
                            <p>Freelance / Collaboration</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT FORM */}
                <form className="contact-form" onSubmit={handleSubmit}>

                    <fieldset className="contact-fieldset">

                        <legend>Send Message</legend>

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />

                        <textarea
                            name="message"
                            rows="6"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                        {response && (
                            <p style={{ marginTop: "10px", color: "#0ea5e9" }}>
                                {response}
                            </p>
                        )}

                    </fieldset>

                </form>

            </div>

        </section>
    )
}

export default Contact