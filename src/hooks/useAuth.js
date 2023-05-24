import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
    const [token, setToken] = useLocalStorage("token", null);
    const [, setRefreshToken] = useLocalStorage("refresh-token", null);

    const setAuth = (accessToken, refreshToken) => {
        setToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const user = useMemo(() => {
        if (!token) return null;
        const { id, sub: email, firstname, lastname, mfaEnable } = jwtDecode(token);

        return { id, email, firstname, lastname, mfaEnable };
    }, [token]);

    return {
        user,
        setAuth,
    };
};
