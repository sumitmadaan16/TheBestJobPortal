import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditJob from "./EditJob";

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token, isAuthenticated } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchJobDetail = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/jobs/${id}`);

            if (response.ok) {
                const data = await response.json();
                setJob(data);
            } else {
                setError("Job not found");
            }
        } catch (err) {
            console.error("Error fetching job details:", err);
            setError("Failed to load job details");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!canModify) {
            alert("You can only delete jobs that you posted");
            return;
        }

        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                const response = await fetch(`http://localhost:8080/jobs/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    alert("Job deleted successfully!");
                    navigate("/jobs");
                } else {
                    const errorText = await response.text();
                    alert(errorText || "Failed to delete job");
                }
            } catch (error) {
                console.error("Error deleting job:", error);
                alert("Error deleting job");
            }
        }
    };

    const handleJobUpdated = (updatedJob) => {
        setJob(updatedJob);
    };

    useEffect(() => {
        fetchJobDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="main-content">
                <div className="loading">Loading job details...</div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="main-content">
                <div className="error-message">
                    {error || "Job not found"}
                    <br />
                    <button onClick={() => navigate("/jobs")} className="submit-btn">
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    const canModify = isAuthenticated && user?.username === job.postedBy;

    return (
        <>
            <div className="main-content">
                <div className="job-detail-container">
                    <button onClick={() => navigate("/jobs")} className="back-btn">
                        ← Back to Jobs
                    </button>

                    <div className="job-detail-card">
                        <div className="job-detail-header">
                            <div>
                                <h1 className="job-detail-title">{job.jobTitle}</h1>
                                {job.postedBy && (
                                    <p className="posted-by-detail">Posted by: {job.postedBy}</p>
                                )}
                            </div>

                            {canModify && (
                                <div className="job-detail-actions">
                                    <button
                                        className="edit-btn-large"
                                        onClick={() => setShowEditModal(true)}
                                    >
                                        ✎ Edit Job
                                    </button>
                                    <button className="delete-btn-large" onClick={handleDelete}>
                                        ✕ Delete Job
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="job-detail-section">
                            <h3 className="section-title">Experience Required</h3>
                            <p className="experience-detail">{job.experience} years</p>
                        </div>

                        <div className="job-detail-section">
                            <h3 className="section-title">Job Description</h3>
                            <p className="description-detail">{job.jobDescription}</p>
                        </div>

                        <div className="job-detail-section">
                            <h3 className="section-title">Required Tech Stack</h3>
                            <div className="tech-tags-detail">
                                {job.techStack && job.techStack.length > 0 ? (
                                    job.techStack.map((tech, index) => (
                                        <span key={index} className="tech-tag-large">
                      {tech.name}
                    </span>
                                    ))
                                ) : (
                                    <p className="no-tech">No specific tech stack mentioned</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <EditJob
                    job={job}
                    onJobUpdated={handleJobUpdated}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </>
    );
};

export default JobDetail;