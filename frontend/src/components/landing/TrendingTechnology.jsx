import React from "react";
import { Carousel } from "antd";

import {
  FaPython,
  FaReact,
  FaRust,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFastapi,
  SiGo,
} from "react-icons/si";

import "../../styles/landing.css";

const technologies = [
  {
    name: "Python",
    icon: <FaPython />,
    salary: "$120K",
    duration: "2-6 Months",
    difficulty: "Easy",
  },
  {
    name: "React",
    icon: <FaReact />,
    salary: "$130K",
    duration: "2-4 Months",
    difficulty: "Medium",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    salary: "$140K",
    duration: "2-4 Months",
    difficulty: "Medium",
  },
  {
    name: "FastAPI",
    icon: <SiFastapi />,
    salary: "$125K",
    duration: "2-3 Months",
    difficulty: "Medium",
  },
  {
    name: "Rust",
    icon: <FaRust />,
    salary: "$150K",
    duration: "4-6 Months",
    difficulty: "Hard",
  },
 
];

const TrendingTechnology = () => {
  return (
    <section className="trending" id="trending">

      <div className="trending-header">
        <h2>Trending Technologies</h2>
      </div>

      <Carousel autoplay dots>

        <div>

          <div className="tech-grid">

            {technologies.map((tech) => (

              <div className="tech-card" key={tech.name}>

                <span className="badge">
                  Trending
                </span>

                <div className="tech-icon">
                  {tech.icon}
                </div>

                <h3>{tech.name}</h3>

                <div className="difficulty">
                  {tech.difficulty}
                </div>

                <div className="graph"></div>

                <div className="stats">

                  <div>
                    <strong>{tech.salary}</strong>
                    <span>Avg Salary</span>
                  </div>

                  <div>
                    <strong>{tech.duration}</strong>
                    <span>Learn Time</span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </Carousel>

    </section>
  );
};

export default TrendingTechnology;