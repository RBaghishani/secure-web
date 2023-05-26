import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import jwtDecode from "jwt-decode";
import * as auth from "../api/auth";

export const useAuth = () => {
    const [token, setToken] = useLocalStorage("token", null);
    const [, setRefreshToken] = useLocalStorage("refresh-token", null);

    const setAuth = (accessToken, refreshToken) => {
        setToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const logout = async () => {
        await auth.logout();
        setToken(null);
        setRefreshToken(null);
    };

    const user = useMemo(() => {
        if (!token) return null;
        const {
            id,
            sub: email,
            firstname,
            lastname,
            mfaEnable,
        } = jwtDecode(token);

        return { id, email, firstname, lastname, mfaEnable };
    }, [token]);

    return {
        user,
        setAuth,
        logout,
    };
};
