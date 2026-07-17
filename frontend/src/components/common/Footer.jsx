import React from "react";
import "../../styles/footer.css"
import policy from "../../assets/policy.svg"
import company from "../../assets/company.svg"
import community  from "../../assets/community.svg";
import resource from "../../assets/resource.svg"
import Logo from "../../components/common/Logo.jsx"

const Footer = () => 
{
    return(
        <footer>
            <hr />
            <div className="footer-content">
            <div className="section">
            <div className="footer-logo">
                <Logo/>
            </div>
            <p>Learn your next stack with AI</p>

            <div className="social-icons">
            </div>
            </div>
            <div className="section">
                
                <div className="sec-img">
                    <p><img src={company} alt="" /></p>
                </div>
                <p><a href="#features">Features</a></p>
                <p>
                <a href="#roadmaps">Roadmaps</a>
                </p>
                <p>
                <a href="#community">Community</a>
                </p>
                <p>
                <a href="#news">News</a>
                </p>
                <p>
                <a href="#assistant">Ai Assistant</a>
                </p>
                <p>
                <a href="#tech">Trending Technologies</a>
                </p>
            </div>
            <div className="section">
                
                <div className="sec-img">
                    <p><img src={resource} alt="" /></p>
                </div>
                <p><a href="#features">Documentation</a></p>
                <p>
                <a href="#faq">FAQ</a>
                </p>
                <p>
                <a href="#community">Help</a>
                </p>
                <p>
                <a href="#news">Blog</a>
                </p>
            </div>
            <div className="section">
                <p><img src={community} alt="" /></p>
                <p><a href="#features">About</a></p>
                <p>
                <a href="#roadmaps">Contact</a>
                </p>
            </div>  
        <div className="section">
                
            <div className="sec-img">
                <p><img src={policy} alt="" /></p>
            </div>
                <p><a href="#features">Privacy Policy</a></p>
                <p>
                <a href="#roadmaps">Terms of Service</a>
                </p>
                <p>
                <a href="#roadmaps">Cookie Policy</a>
                </p>
            </div>  
            </div>
             <hr />
        <div className="copyright">
   
        <p>&copy; 2026 StackMaps. All rights are reserved</p>   
</div>
        </footer>
    );
}
export default Footer;