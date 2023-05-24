import { client } from '.';

export const login = async (email, password, code) => {
    const { data } = await client.post("/auth/authenticate", {
        email,
        password,
        code,
    });

    return data;
};

export const register = async (user) => {
    const { data } = await client.post("/auth/register", user);

    return data;
};

export const logout = async () => {
    const { data } = await client.post("/auth/logout");

    return data;
};
