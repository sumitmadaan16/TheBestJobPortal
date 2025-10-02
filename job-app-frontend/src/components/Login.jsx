import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token, data.username);
                navigate("/jobs");
            } else {
                const errorText = await response.text();
                setError(errorText || "Invalid username or password");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to continue to TheBestJobPortal</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;