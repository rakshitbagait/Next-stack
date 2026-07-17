import React from "react";
import "../../styles/landing.css"
import mascot from "../../assets/mascot.png"

const Hero = () => 
{
    return(
        <div className="Hero">
            <div className="Hero-text">
            <h1>
                Master Your Next Tech Stack <br />
                with <span>AI</span></h1>
            <p>
                StackMaps creates personalized AI-powered learning roadmaps tailored to your goals,<br />
                 experience, and schedule. <br />Learn the right technologies in the right order using trusted resources, 
                 industry best practices, and real-world learning paths—all without information overload.
            </p>
            <button className="Hero-btn">
                Get Started
            </button>
            </div>
            <div className="lang-card-mascot">
<div className="lang-section">

    <div className="roadmap-item completed">
        <div className="roadmap-dot"></div>
        <div className="tech-lang">Python</div>
    </div>

    <div className="roadmap-line completed-line"></div>

    <div className="roadmap-item current">
        <div className="roadmap-dot"></div> 
        <div className="tech-lang">React</div>
    </div>

    <div className="roadmap-line"></div>

    <div className="roadmap-item">
        <div className="roadmap-dot"></div>
        <div className="tech-lang">Docker</div>
    </div>

</div>
                <div className="mascot">
                    <h4>
                        Ask Ai Mentor
                    </h4>
                    <p>
                        Stuck on a concept?<br />
                        Get AI help tailored to your current roadmap.
                    </p>
                    <button>Ask AI</button>
                    <img src={mascot} alt="mascot-img" />
                </div>
            </div>
        </div>
    );
}
export default Hero;