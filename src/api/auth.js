import { client } from ".";

export const login = async (email, password, code) => {
    const { data } = await client.post("/auth/authenticate", {
        email,
        password,
        code,
    });

    return data;
};

export const register = async (user) => {
    const { data } = await client.post("/auth/register", user, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export const logout = async () => {
    const { data } = await client.post("/auth/logout");

    return data;
};

export const getQRUrl = (email) => {
    return client.defaults.baseURL + "/mfa/generate?email=" + email;
};

export const getOTPCode = async (email) => {
    const { data } = await client.get("/mfa/generate", {
        params: {
            email
        }
    });

    return data;
};

export const validate = async (email, code) => {
    const { data } = await client.post("/mfa/validate", {
        email,
        code,
    });

    return data;
};
