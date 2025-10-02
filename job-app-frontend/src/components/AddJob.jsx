import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AddJob = ({ onJobAdded, onClose }) => {
    const { token } = useAuth();
    const [jobData, setJobData] = useState({
        jobTitle: "",
        jobDescription: "",
        experience: "",
        techStack: []
    });
    const [techInput, setTechInput] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const addTechStack = () => {
        if (
            techInput.trim() &&
            !jobData.techStack.some(
                (tech) => tech.name.toLowerCase() === techInput.trim().toLowerCase()
            )
        ) {
            setJobData((prev) => ({
                ...prev,
                techStack: [...prev.techStack, { name: techInput.trim() }]
            }));
            setTechInput("");
        }
    };

    const removeTechStack = (indexToRemove) => {
        setJobData((prev) => ({
            ...prev,
            techStack: prev.techStack.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async () => {
        if (!jobData.jobTitle || !jobData.jobDescription || !jobData.experience) {
            setError("Please fill in all required fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...jobData,
                    experience: parseInt(jobData.experience)
                })
            });

            if (response.ok) {
                const newJob = await response.json();
                onJobAdded(newJob);
                alert("Job added successfully!");
                onClose();
            } else {
                const errorText = await response.text();
                setError(errorText || "Failed to add job");
            }
        } catch (error) {
            console.error("Error adding job:", error);
            setError("Error adding job: " + error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add New Job</h2>
                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="job-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Job Title *</label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={jobData.jobTitle}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Description *</label>
                        <textarea
                            name="jobDescription"
                            value={jobData.jobDescription}
                            onChange={handleInputChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Experience Required (years) *</label>
                        <input
                            type="number"
                            name="experience"
                            value={jobData.experience}
                            onChange={handleInputChange}
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tech Stack</label>
                        <div className="tech-input-container">
                            <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                placeholder="Enter technology"
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechStack())}
                            />
                            <button type="button" onClick={addTechStack} className="add-tech-btn">
                                Add
                            </button>
                        </div>
                        <div className="tech-tags">
                            {jobData.techStack.map((tech, index) => (
                                <span key={index} className="tech-tag">
                  {tech.name}
                                    <button
                                        type="button"
                                        onClick={() => removeTechStack(index)}
                                        className="remove-tech"
                                    >
                    ✕
                  </button>
                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="button" onClick={handleSubmit} className="submit-btn">
                            Add Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddJob;