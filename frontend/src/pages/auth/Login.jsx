import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/common/Logo";
import mascot from "../../assets/mascot-robo.png";
import "../../styles/auth.css";
import "../../styles/global.css";
import {googleLogin} from "../../services/googleAuth"

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";




import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaRoute,
    FaBookOpen,
    FaChartLine,
    FaUsers,
    
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

function Login() {
const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {

        const response = await axios.post(
            "http://localhost:8000/accounts/login-view/",
            formData,
            {
                withCredentials: true,
            }
        );

        if (response.data.status) {

            navigate(response.data.redirect);

        } else {

            setError(response.data.message);

        }

    } catch (error) {

        if (error.response) {

            setError(error.response.data.message);

            if (error.response.data.redirect) {
                navigate(error.response.data.redirect);
            }

        } else {

            setError("Something went wrong.");

        }
    }
};

    return (
        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-left">
            <div className="login-logo">
                <Logo />
            </div>

                <div className="login-left-content">

                    <h1>
                        Welcome Back! 
                    </h1>

                    <h2>
                        Continue Your Learning Journey
                    </h2>

                    <p>
                        Log in to your account and continue building your skills,
                        tracking progress, and achieving your goals with
                        StackMaps.
                    </p>

                    <div className="login-features">

                        <div className="feature-item">
                            <div className="feature-icon"><FaRoute /></div>

                            <div>
                                <h4>Personalized Roadmaps</h4>

                                <p>
                                    AI-generated roadmaps tailored just for you.
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">< FaBookOpen /></div>

                            <div>
                                <h4>Daily Learning Tasks</h4>

                                <p>
                                    Stay consistent with daily tasks and
                                    reminders.
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon"><FaChartLine /></div>

                            <div>
                                <h4>Track Your Progress</h4>

                                <p>
                                    Visualize your learning progress every day.
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon"> <FaUsers /></div>

                            <div>
                                <h4>Community & Support</h4>

                                <p>
                                    Connect with developers and grow together.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* <img
                    src={mascot}
                    alt="StackMaps Mascot"
                    className="login-mascot"
                /> */}

            </div>

            {/* RIGHT SIDE */}

            <div className="login-right">

                <div className="login-card">

                    <h1>
                        Log in to StackMaps.sh
                    </h1>

                    <p>
                        Continue your personalized learning experience
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* EMAIL */}

                        <div className="input-group">

                            <label>Email Address</label>

                            <div className="input-box">

                                <FaEnvelope className="input-icon" />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* PASSWORD */}

                        <div className="input-group">

                            <label>Password</label>

                            <div className="input-box">

                                <FaLock className="input-icon" />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* OPTIONS */}

                        <div className="login-options">

                            <label className="remember">

                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />

                                Remember me

                            </label>

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>

                        </div>
                        {error && (
                            <p className="error">
                                {error}
                            </p>
                        )}
                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-btn"
                        >
                            Log In
                        </button>

                    </form>

                    {/* DIVIDER */}

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    {/* GOOGLE */}



                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            const response = await axios.post(
                                "http://localhost:8000/accounts/google-login/",
                                {
                                    credential: credentialResponse.credential,
                                }
                            );

                            console.log(response.data);

                            if (response.data.status) {
                                navigate("/dashboard");
                            }

                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    onError={() => {
                        console.log("Google Login Failed");
                    }}
                />
                    {/* REGISTER */}

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">
                            Sign up
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;