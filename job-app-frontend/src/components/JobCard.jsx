import React from 'react';

const JobCard = ({ job, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                const response = await fetch(`http://localhost:8080/jobs/${job.jobId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    onDelete(job.jobId);
                    alert('Job deleted successfully!');
                } else {
                    alert('Failed to delete job');
                }
            } catch (error) {
                console.error('Error deleting job:', error);
                alert('Error deleting job');
            }
        }
    };

    return (
        <div className="job-card">
            <div className="job-header">
                <h3>{job.jobTitle}</h3>
                <button className="delete-btn" onClick={handleDelete}>✕</button>
            </div>
            <p className="experience">Experience Required: {job.experience} years</p>
            <p className="description">{job.jobDescription}</p>
            <div className="tech-stack">
                <strong>Tech Stack:</strong>
                <div className="tech-tags">
                    {job.techStack && job.techStack.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech.name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobCard;