import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

function AppBootstrap() {

    const navigate = useNavigate();

    useEffect(() => {

        const bootstrap = async () => {

            try {

                const response = await api.get("/accounts/bootstrap/");

                navigate(response.data.redirect, { replace: true });

            } catch (error) {

                navigate("/", { replace: true });

            }

        };

        bootstrap();

    }, []);

    return null;
}

export default AppBootstrap;