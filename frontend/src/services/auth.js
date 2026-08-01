import API_URL from "./api";

const AUTH_API = `${API_URL}/auth`;

export const loginRequest = async (username, password) => {
    const response = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    return await response.json();
};