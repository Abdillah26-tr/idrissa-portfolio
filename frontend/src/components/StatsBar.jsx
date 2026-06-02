import { useEffect, useState } from "react";
import "./stat.css";

function StatsBar() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    async function loadStats() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/stats/");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadStats();

  }, []);

  if (!stats) return null;

  return (

    <section className="stats">

      <div className="stat-item">
        <div className="icon-box">
          <i className="fa-solid fa-code"></i>
        </div>
        <div className="info">
          <h3>{stats.projects}+</h3>
          <p>Projects</p>
        </div>
      </div>

      <div className="line"></div>

      <div className="stat-item">
        <div className="icon-box">
          <i className="fa-solid fa-brain"></i>
        </div>
        <div className="info">
          <h3>{stats.skills}+</h3>
          <p>Skills</p>
        </div>
      </div>

      <div className="line"></div>

      <div className="stat-item">
        <div className="icon-box">
          <i className="fa-solid fa-laptop-code"></i>
        </div>
        <div className="info">
          <h3>{stats.tools}+</h3>
          <p>Tools</p>
        </div>
      </div>

      <div className="line"></div>

      <div className="stat-item">
        <div className="icon-box">
          <i className="fa-solid fa-certificate"></i>
        </div>
        <div className="info">
          <h3>{stats.certificates}+</h3>
          <p>Certificates</p>
        </div>
      </div>

    </section>

  );
}

export default StatsBar;