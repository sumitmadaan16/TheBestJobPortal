// src/components/JobCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditJob from "./EditJob";

const JobCard = ({ job, onDelete, onUpdate }) => {
    const { user, token, isAuthenticated } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const canModify = isAuthenticated && user?.username === job.postedBy;

    const handleDelete = async () => {
        if (!canModify) {
            alert("You can only delete jobs that you posted");
            return;
        }

        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                const response = await fetch(`http://localhost:8080/jobs/${job.jobId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    onDelete(job.jobId);
                    alert("Job deleted successfully!");
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

    return (
        <>
            <div className="job-card">
                <div className="job-header">
                    <h3>{job.jobTitle}</h3>
                    <div className="job-actions">
                        {canModify && (
                            <>
                                <button
                                    className="edit-btn"
                                    onClick={() => setShowEditModal(true)}
                                    title="Edit Job"
                                >
                                    ✎
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={handleDelete}
                                    title="Delete Job"
                                >
                                    ✕
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <p className="experience">Experience Required: {job.experience} years</p>

                <p className="description">
                    {job.jobDescription.length > 150
                        ? `${job.jobDescription.substring(0, 150)}...`
                        : job.jobDescription}
                </p>

                {job.postedBy && (
                    <p className="posted-by">Posted by: {job.postedBy}</p>
                )}

                <div className="tech-stack">
                    <strong>Tech Stack:</strong>
                    <div className="tech-tags">
                        {job.techStack &&
                            job.techStack.map((tech, index) => (
                                <span key={index} className="tech-tag">
                  {tech.name}
                </span>
                            ))}
                    </div>
                </div>

                <Link to={`/jobs/${job.jobId}`} className="view-details-link">
                    View Full Details →
                </Link>
            </div>

            {showEditModal && (
                <EditJob
                    job={job}
                    onJobUpdated={onUpdate}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </>
    );
};

export default JobCard;