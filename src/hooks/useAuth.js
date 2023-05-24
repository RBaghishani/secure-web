import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    const [, setToken] = useLocalStorage("token", null);
    const [, setRefreshToken] = useLocalStorage("refresh-token", null);

    const setAuth = (accessToken, refreshToken) => {
        setToken(accessToken);
        setRefreshToken(refreshToken);
    };

    return {
        setAuth,
    };
};
