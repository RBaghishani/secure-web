import jwtDecode from "jwt-decode";
import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
    const [token] = useLocalStorage("token", null);
    if (!token) {
        return null;
    }
    const { sub: email } = jwtDecode(token);

    return {
        email,
    };
};
