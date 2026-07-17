import React from "react";
import { Card } from "antd";
import mascotHead from "../../assets/mascotHead.png"

import {
    RobotOutlined,
    DeploymentUnitOutlined,
    BarChartOutlined,
    GlobalOutlined,
    TeamOutlined,
    NotificationOutlined,
} from "@ant-design/icons";

import "../../styles/landing.css";

const Features = () => {
    return (
        <section className="features">

            <h2>Powerful Features</h2>

            <p className="features-subtitle">
                Everything you need to master your next technology with AI.
            </p>

            <div className="features-container">

                <Card className="feature-card">
                   <img src={mascotHead} alt="mascot-head" className="mascot-head"/ >
                    <h3>AI Mentor</h3>
                    <p>
                        Get instant explanations, coding help and learning guidance
                        tailored to your roadmap.
                    </p>
                </Card>

                <Card className="feature-card">
                    <DeploymentUnitOutlined className="feature-icon" />
                    <h3>Personalized Roadmaps</h3>
                    <p>
                        AI creates structured learning paths based on your goals,
                        experience and available time.
                    </p>
                </Card>

                <Card className="feature-card">
                    <BarChartOutlined className="feature-icon" />
                    <h3>Progress Tracking</h3>
                    <p>
                        Track completed topics, monitor your learning streaks and
                        visualize your progress.
                    </p>
                </Card>

                <Card className="feature-card">
                    <GlobalOutlined className="feature-icon" />
                    <h3>Curated Resources</h3>
                    <p>
                        Learn from the best documentation, YouTube channels,
                        GitHub repositories and online courses.
                    </p>
                </Card>

                <Card className="feature-card">
                    <TeamOutlined className="feature-icon" />
                    <h3>Developer Community</h3>
                    <p>
                        Ask questions, share knowledge and collaborate with
                        developers around the world.
                    </p>
                </Card>

                <Card className="feature-card">
                    <NotificationOutlined className="feature-icon" />
                    <h3>Trending Tech</h3>
                    <p>
                        Stay updated with the latest technologies, tools,
                        frameworks and AI innovations.
                    </p>
                </Card>

            </div>

        </section>
    );
};

export default Features;