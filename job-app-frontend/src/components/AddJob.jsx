import React, { useState } from "react";

const AddJob = ({ onJobAdded, onClose }) => {
    const [jobData, setJobData] = useState({
        jobTitle: '',
        jobDescription: '',
        experience: '',
        techStack: []
    });
    const [techInput, setTechInput] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addTechStack = () => {
        if (techInput.trim() && !jobData.techStack.some(tech => tech.name.toLowerCase() === techInput.trim().toLowerCase())) {
            setJobData(prev => ({
                ...prev,
                techStack: [...prev.techStack, { name: techInput.trim() }]
            }));
            setTechInput('');
        }
    };

    const removeTechStack = (indexToRemove) => {
        setJobData(prev => ({
            ...prev,
            techStack: prev.techStack.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async () => {
        if (!jobData.jobTitle || !jobData.jobDescription || !jobData.experience) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            console.log('Submitting job data:', jobData);
            const response = await fetch('http://localhost:8080/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...jobData,
                    experience: parseInt(jobData.experience)
                }),
            });

            console.log('Add job response status:', response.status);

            if (response.ok) {
                const newJob = await response.json();
                console.log('Job added successfully:', newJob);
                onJobAdded(newJob);
                alert('Job added successfully!');
                setJobData({
                    jobTitle: '',
                    jobDescription: '',
                    experience: '',
                    techStack: []
                });
                onClose();
            } else {
                const errorText = await response.text();
                console.error('Failed to add job:', errorText);
                alert('Failed to add job: ' + errorText);
            }
        } catch (error) {
            console.error('Error adding job:', error);
            alert('Error adding job: ' + error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add New Job</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="job-form">
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
                                onKeyPress={(e) => e.key === 'Enter' && addTechStack()}
                            />
                            <button type="button" onClick={addTechStack} className="add-tech-btn">
                                Add
                            </button>
                        </div>
                        <div className="tech-tags">
                            {jobData.techStack.map((tech, index) => (
                                <span key={index} className="tech-tag">
                                    {tech.name}
                                    <button type="button" onClick={() => removeTechStack(index)} className="remove-tech">
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