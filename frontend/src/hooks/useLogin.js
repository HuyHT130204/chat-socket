import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// handleInputErrors function
export function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}

// useLogin hook
const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});


            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error("Incorrect username or password");
                }
                throw new Error("Login failed. Please try again later.");
            }

            const data = await res.json();
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
