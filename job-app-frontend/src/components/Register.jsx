import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (response.ok) {
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                const errorText = await response.text();
                setError(errorText || "Registration failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join TheBestJobPortal today</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;