import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import SearchJob from "./SearchJob";
import JobCard from "./JobCard";
import AddJob from "./AddJob";

const HomePage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddJob, setShowAddJob] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("http://localhost:8080/jobs");

            if (response.ok) {
                const data = await response.json();
                setJobs(data);
            } else {
                setError(`Failed to fetch jobs: ${response.status}`);
                setJobs([]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError(`Network error: ${error.message}`);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const searchJobs = async (techName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `http://localhost:8080/jobs/search?tech=${encodeURIComponent(techName)}`
            );

            if (response.ok) {
                const data = await response.json();
                setJobs(data);
                setSearchActive(true);
            } else {
                setJobs([]);
                setSearchActive(true);
            }
        } catch (error) {
            console.error("Error searching jobs:", error);
            setError(`Search error: ${error.message}`);
            setJobs([]);
            setSearchActive(true);
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => {
        setSearchActive(false);
        fetchJobs();
    };

    const handleJobAdded = (newJob) => {
        if (!searchActive) {
            setJobs((prev) => [newJob, ...prev]);
        } else {
            fetchJobs();
        }
    };

    const handleJobDeleted = (jobId) => {
        setJobs((prev) => prev.filter((job) => job.jobId !== jobId));
    };

    const handleJobUpdated = (updatedJob) => {
        setJobs((prev) =>
            prev.map((job) => (job.jobId === updatedJob.jobId ? updatedJob : job))
        );
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="main-content">
            <SearchJob onSearch={searchJobs} onClearSearch={clearSearch} />

            {isAuthenticated && (
                <div className="action-bar">
                    <button className="add-job-btn" onClick={() => setShowAddJob(true)}>
                        + Add Job
                    </button>
                </div>
            )}

            <div className="jobs-section">
                <div className="jobs-header">
                    <h2 className="allJobs">
                        {searchActive ? "Search Results" : "All Jobs"} ({jobs.length})
                    </h2>
                </div>

                {error && (
                    <div className="error-message">
                        Error: {error}
                        <br />
                        <button onClick={fetchJobs} className="retry-btn">
                            Retry
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="loading">Loading jobs...</div>
                ) : jobs.length === 0 ? (
                    <div className="no-jobs">
                        {searchActive
                            ? "No jobs found for this technology."
                            : "No jobs available. Add some jobs to get started!"}
                    </div>
                ) : (
                    <div className="jobs-grid">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.jobId}
                                job={job}
                                onDelete={handleJobDeleted}
                                onUpdate={handleJobUpdated}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showAddJob && (
                <AddJob
                    onJobAdded={handleJobAdded}
                    onClose={() => setShowAddJob(false)}
                />
            )}
        </div>
    );
};

export default HomePage;