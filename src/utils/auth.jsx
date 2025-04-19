import {jwtDecode} from "jwt-decode";

// Giải mã JWT để lấy user ID & role
export const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
