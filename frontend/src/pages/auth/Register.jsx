import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../components/common/Logo";
import {googleLogin} from "../../services/googleAuth"
import "../../styles/auth.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaRoute,
    FaBrain,
    FaChartLine,
    FaUsers
} from "react-icons/fa6";

import { FcGoogle } from "react-icons/fc";
import { FaRocket } from "react-icons/fa";

function Register() {

    const [error, setErrors] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const handleChange = (e) => {

        const { name, value, checked, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/accounts/register-user/",
                formData
            );

            console.log(response.data);

            if (response.data.status) {
                navigate("/verify?email=" + encodeURIComponent(formData.email));
            }

        } catch (error) {
            console.log(error);
            console.log(error.response.data);
                if (error.response) {
        setErrors(error.response.data.error);
    }
        }
    };

    return (

        <div className="login-page">

            {/* LEFT PANEL */}

            <div className="login-left">

                <div className="login-logo">
                    <Logo />
                </div>

                <div className="login-left-content">

                    <h1>Start Your</h1>

                    <h2>Learning Journey</h2>

                    <p>
                        Join thousands of developers building
                        real-world skills with personalized AI roadmaps,
                        coding challenges and structured learning.
                    </p>

                    <div className="login-features">

                        <div className="feature-item">

                            <div className="feature-icon">
                                <FaRocket />
                            </div>

                            <div>

                                <h4>Create Your Learning Path</h4>

                                <p>
                                    Personalized roadmap based on your goals.
                                </p>

                            </div>

                        </div>

                        <div className="feature-item">

                            <div className="feature-icon">
                                <FaBrain />
                            </div>

                            <div>

                                <h4>AI Powered Mentor</h4>

                                <p>
                                    Learn smarter with intelligent guidance.
                                </p>

                            </div>

                        </div>

                        <div className="feature-item">

                            <div className="feature-icon">
                                <FaChartLine />
                            </div>

                            <div>

                                <h4>Track Progress</h4>

                                <p>
                                    Build streaks and measure improvement.
                                </p>

                            </div>

                        </div>

                        <div className="feature-item">

                            <div className="feature-icon">
                                <FaUsers />
                            </div>

                            <div>

                                <h4>Developer Community</h4>

                                <p>
                                    Learn, discuss and grow together.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="login-right">

                <div className="login-card">

                    <h1>Create Account</h1>

                    <p>
                        Join StackMaps and start learning today.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* NAME */}

                        <div className="input-group">

                            <label>Full Name</label>

                            <div className="input-box">

                                <FaUser className="input-icon" />

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                {error?.name && (<span className="error">{error.name}</span>)}

                            </div>

                        </div>

                        {/* EMAIL */}

                        <div className="input-group">

                            <label>Email</label>

                            <div className="input-box">

                                <FaEnvelope className="input-icon" />

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {error?.email && (<span className="error">{error.email}</span>)}
                            </div>

                        </div>

                        {/* PASSWORD */}

                        <div className="input-group">

                            <label>Password</label>

                            <div className="input-box">

                                <FaLock className="input-icon" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {error?.password && (<span className="error">{error.password}</span>)}


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >

                                    {showPassword ? <FaEyeSlash /> : <FaEye />}

                                </button>

                            </div>

                        </div>

                        {/* CONFIRM PASSWORD */}

                        <div className="input-group">

                            <label>Confirm Password</label>

                            <div className="input-box">

                                <FaLock className="input-icon" />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {error?.confirm_password && (<span className="error">{error.confirm_password}</span>)}


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >

                                    {showConfirmPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                        </div>

                        {/* TERMS */}

                        <div className="login-options">

                            <label className="remember">

                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                />

                                I agree to the Terms & Conditions

                            </label>

                        </div>

                        <button
                            className="login-btn"
                            type="submit"
                            
                        >
                            Create Account
                        </button>

                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

        <GoogleLogin
    onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
    }}
    onError={() => {
        console.log("Google Login Failed");
    }}
        />

                    <p className="register-text">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;