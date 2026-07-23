import axios from "../api/axios";

export const googleLogin = async (credential) => {
    const response = await axios.post("/accounts/google-login/", {
        credential,
    });

    return response.data;
};