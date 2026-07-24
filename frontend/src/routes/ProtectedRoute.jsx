import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const checkSession = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/accounts/session-view/",
                    {
                        withCredentials: true,
                    }
                );

                if (response.data.status) {
                    setAuthenticated(true);
                }

            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }

        };

        checkSession();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;