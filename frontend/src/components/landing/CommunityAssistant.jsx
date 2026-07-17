import React from "react";
import "../../styles/landing.css";   

import mascot from "../../assets/mascot-robo.png";
import mascotHead from "../../assets/mascotHead.png"


import {
    FaComments,
    FaRobot,
    FaPaperPlane,
    FaStar,
    FaFire,
    FaClock,
    FaCheckCircle,
} from "react-icons/fa";

const communityQuestions = [
    {
        title: "Best resources to learn System Design?",
        author: "Vansh",
        time: "21 min ago",
        replies: 24,
    },
    {
        title: "How to optimize Python code performance?",
        author: "CodeMaster",
        time: "25 min ago",
        replies: 18,
    },
    {
        title: "React vs Next.js in 2026?",
        author: "OpenAI User",
        time: "1 hr ago",
        replies: 32,
    },
    {
        title: "Career roadmap for AI Engineer?",
        author: "Megha",
        time: "2 hr ago",
        replies: 27,
    },
];

const contributors = [
    {
        name: "Snehal",
        points: "12.4k",
    },
    {
        name: "Adi Dev",
        points: "9.8k",
    },
    {
        name: "Pranav",
        points: "8.7k",
    },
    {
        name: "Megha",
        points: "7.3k",
    },
];

const roadmap = [
    "Django Basics",
    "Django REST Framework",
    "Authentication",
    "Project APIs",
    "Deployment",
];

const CommunityAssistant = () => {
    return (
        <section className="community-ai">

            {/* COMMUNITY */}

            <div className="community-card">

                <div className="community-header">

                    <h2>
                        <FaComments />
                        Community Hub
                    </h2>

                    <a href="#">
                        View All
                    </a>

                </div>

                <div className="community-tabs">

                    <button className="active">
                        <FaFire />
                        Popular
                    </button>

                    <button>
                        <FaClock />
                        Recent
                    </button>

                    <button>
                        Unanswered
                    </button>

                </div>

                <div className="community-content">

                    {/* Questions */}

                    <div className="questions">

                        {communityQuestions.map((question, index) => (

                            <div
                                className="question-item"
                                key={index}
                            >

                                <div>

                                    <h4>
                                        {question.title}
                                    </h4>

                                    <span>

                                        Answered by {question.author}

                                        •

                                        {question.time}

                                    </span>

                                </div>

                                <div className="reply-count">

                                    {question.replies}

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Contributors */}

                    <div className="contributors">

                        <h3>
                            Top Contributors
                        </h3>

                        {contributors.map((person, index) => (

                            <div
                                className="contributor"
                                key={index}
                            >

                                <div className="avatar">

                                    {person.name.charAt(0)}

                                </div>

                                <span>
                                    {person.name}
                                </span>

                                <strong>

                                    {person.points}

                                </strong>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* AI ASSISTANT */}

            <div className="assistant-card">

                <div className="assistant-header">

                    <h2>

                    <img src={mascotHead} alt="mascot-head" className="mascot-head"/ >
                        

                        AI Assistant

                    </h2>

                </div>

                <div className="assistant-chat">

                    <div className="assistant-image">

                        <img
                            src={mascot}
                            alt="AI"
                        />

                    </div>

                    <div className="assistant-right">

                        <div className="user-question">

                            What do you want to learn today?

                        </div>

                        <div className="assistant-answer">

                            I want to learn Django REST APIs

                        </div>

                        <div className="assistant-roadmap">

                            <h4>

                                Great choice! Here's your roadmap

                            </h4>

                            {roadmap.map((step, index) => (

                                <div
                                    className="roadmap-step"
                                    key={index}
                                >

                                    <div className="step-left">

                                        <FaCheckCircle />

                                        <span>

                                            {step}

                                        </span>

                                    </div>

                                    <div className="progress">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${80-index*10}%`,
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="assistant-input">

                    <input
                        type="text"
                        placeholder="Ask anything..."
                    />

                    <button>

                        <FaPaperPlane />

                    </button>

                </div>

            </div>

        </section>
    );
};

export default CommunityAssistant;