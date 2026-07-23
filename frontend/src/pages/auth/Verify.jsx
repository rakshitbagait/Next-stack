import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);

    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    
    const handleResendOtp = async () => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/accounts/resend-otp/",
            {
                email,
            }
        );
        setMessage(response.data.message);
        setIsError(false);

    } catch (error) {
        setMessage(
        error.response
        ? Object.values(error.response.data.error).join("\n")
        : "Something went wrong.");
        setIsError(true);
    }
};
    const handleVerify = async (e) => {
        e.preventDefault();

        setLoading(true);
        setIsError(false);
        setMessage("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/accounts/verify-register/",
                {
                    email,
                    otp,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.status) {
                navigate("/wizard", {
                    state: {
                        email,
                    },
                });
            }
        } catch (error) {
                        
            if (error.response) {
                console.log(error.response.data);

                setMessage(
                    Object.values(error.response.data.error).join("\n")
                );

                setIsError(true);
            
            } 
            else {
                setMessage("Server unavailable.");
                setIsError(true);
            }
        }
        
         finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-container">
            <div className="verify-card">

                <h1>Email Verification</h1>

                <p className="verify-text">
                    We've sent a 6-digit verification code to
                </p>

                <p className="verify-email">
                    {email}
                </p>

                <form onSubmit={handleVerify}>

                    <input
                        type="text"
                        maxLength="6"
                        className="verify-input"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    {message && (
                        <p className={isError ? "error" : "success-message"}>
                            {message}
                        </p>
                    )}
                    <p className="resend-otp-link"><a href="#" onClick={(e) => {e.preventDefault();handleResendOtp();}}>Resend OTP</a></p>

                    <button
                        className="verify-btn"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Verify;