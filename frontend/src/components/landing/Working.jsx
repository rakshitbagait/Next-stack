import React from "react";
import "../../styles/landing.css";

import { FaRobot, FaArrowRight, FaTrophy } from "react-icons/fa";
import { MdRoute } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import interview from "../../assets/ai-interview.png";
import roadmap from "../../assets/roadmap-builder.png";
import guidance from "../../assets/ai-guidance.png";
import success from "../../assets/success.png";

const steps = [
  {
    id: 1,
    image: interview,
    title: "AI asks about your goals",
    description:
      "We understand your background, interests and career goals.",
  },
  {
    id: 2,
    image: roadmap,
    title: "Creates personalized roadmap",
    description:
      "AI builds a custom learning path just for you.",
  },
  {
    id: 3,
    image: guidance,
    title: "Daily AI guidance",
    description:
      "Get daily tasks, resources and smart recommendations.",
  },
  {
    id: 4,
    image: success,
    title: "Become Industry Ready",
    description:
      "Track progress, build projects and achieve your goals.",
  },
];

const Working = () => {
  return (
    <section className="working">

      <h2>How StackMaps Works</h2>

      <div className="working-card">

        {steps.map((step, index) => (
          <React.Fragment key={step.id}>

            <div className="working-step">

              <div className="working-icon">
                <img 
                src={step.image}
                alt={step.title}
                className="working-image"
                />
              </div>

              <div className="working-number">
                {step.id}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>

            {index !== steps.length - 1 && (
              <div className="working-arrow">
                <FaArrowRight />
              </div>
            )}

          </React.Fragment>
        ))}

      </div>

    </section>
  );
};

export default Working;