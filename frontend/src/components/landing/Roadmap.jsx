import React from "react";
import "../../styles/landing.css";
import { Link } from "react-router-dom";

import {
  FaPython,
  FaReact,
  FaDocker,
} from "react-icons/fa";

import {
  SiDjango,
  SiFastapi,
} from "react-icons/si";

import { TbBinaryTree2 } from "react-icons/tb";

const roadmapData = [
  {
    id: 1,
    title: "Python",
    subtitle: "Programming Fundamentals",
    icon: <FaPython />,
    completed: true,
  },
  {
    id: 2,
    title: "Object Oriented Programming",
    subtitle: "Classes • Objects • Inheritance",
    icon: <TbBinaryTree2 />,
    completed: true,
  },
  {
    id: 3,
    title: "Data Structures",
    subtitle: "Arrays • Lists • Stacks • Queues",
    icon: <TbBinaryTree2 />,
    completed: false,
  },
  {
    id: 4,
    title: "Algorithms",
    subtitle: "Sorting • Searching • Recursion",
    icon: <TbBinaryTree2 />,
    completed: false,
  },
];

const backendData = [
  {
    id: 5,
    title: "Django",
    subtitle: "Web Framework",
    icon: <SiDjango />,
    completed: false,
  },
  {
    id: 6,
    title: "REST APIs",
    subtitle: "Build Powerful APIs",
    icon: <SiFastapi />,
    completed: false,
  },
  {
    id: 7,
    title: "Docker",
    subtitle: "Deployment",
    icon: <FaDocker />,
    completed: false,
  },
];

const Roadmap = () => {
  return (
    <section className="roadmap">

      {/* Left Side */}

      <div className="roadmap-left">

        <h2>
          Your Personalized
          <br />
          Roadmap
        </h2>

        <p>
          AI generates a personalized learning roadmap based on
          your goals, current experience and available time.
          Learn one concept at a time without feeling overwhelmed.
        </p>
      <Link to="/login">
        <button className="roadmap-btn">
          Try Roadmap Builder →
        </button>
      </Link>
      </div>

      {/* Right Side */}

      <div className="roadmap-right">

        {/* Left Column */}

        <div className="roadmap-column">

          {roadmapData.map((item, index) => (
            <React.Fragment key={item.id}>

              <div className="roadmap-card">

                <div className="roadmap-icon">
                  {item.icon}
                </div>

                <div>

                  <h4>{item.title}</h4>

                  <p>{item.subtitle}</p>

                </div>

              </div>

              {index !== roadmapData.length - 1 && (
                <div
                  className={`vertical-line ${
                    item.completed ? "completed" : ""
                  }`}
                ></div>
              )}

            </React.Fragment>
          ))}

        </div>

        {/* Curved SVG Connector */}

        <div className="roadmap-connector">

          <svg
            width="170"
            height="120"
            viewBox="0 0 170 120"
          >
            <path
              d="M5 20 C70 20 70 100 165 100"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

        </div>

        {/* Right Column */}

        <div className="roadmap-column roadmap-column-right">

          {backendData.map((item, index) => (
            <React.Fragment key={item.id}>

              <div className="roadmap-card">

                <div className="roadmap-icon">
                  {item.icon}
                </div>

                <div>

                  <h4>{item.title}</h4>

                  <p>{item.subtitle}</p>

                </div>

              </div>

              {index !== backendData.length - 1 && (
                <div className="vertical-line"></div>
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Roadmap;