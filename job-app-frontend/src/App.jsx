import React, { useEffect, useState } from "react";
import SearchJob from "./components/SearchJob.jsx";
import JobCard from "./components/JobCard.jsx";
import AddJob from "./components/AddJob.jsx";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddJob, setShowAddJob] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching jobs from: http://localhost:8080/jobs');

      const response = await fetch('http://localhost:8080/jobs');
      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched jobs:', data);
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs, status:', response.status);
        setError(`Failed to fetch jobs: ${response.status}`);
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(`Network error: ${error.message}`);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Search jobs by tech stack
  const searchJobs = async (techName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:8080/jobs/search?tech=${encodeURIComponent(techName)}`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        setSearchActive(true);
      } else {
        setJobs([]);
        setSearchActive(true);
      }
    } catch (error) {
      console.error('Error searching jobs:', error);
      setError(`Search error: ${error.message}`);
      setJobs([]);
      setSearchActive(true);
    } finally {
      setLoading(false);
    }
  };

  // Clear search and show all jobs
  const clearSearch = () => {
    setSearchActive(false);
    fetchJobs();
  };

  // Handle job added
  const handleJobAdded = (newJob) => {
    if (!searchActive) {
      setJobs(prev => [newJob, ...prev]);
    }
  };

  // Handle job deleted
  const handleJobDeleted = (jobId) => {
    setJobs(prev => prev.filter(job => job.jobId !== jobId));
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
      <div className="app">
        <nav className="navbar">
          <h1 className="logo">TheBestJobPortal</h1>
          <button
              className="add-job-btn"
              onClick={() => setShowAddJob(true)}
          >
            + Add Job
          </button>
        </nav>

        <div className="main-content">
          <SearchJob onSearch={searchJobs} onClearSearch={clearSearch} />

          <div className="jobs-section">
            <div className="jobs-header">
              <h2 className="allJobs">
                {searchActive ? 'Search Results' : 'All Jobs'}
                ({jobs.length})
              </h2>
            </div>

            {error && (
                <div className="error-message">
                  Error: {error}
                  <br />
                  <button
                      onClick={fetchJobs}
                      className="retry-btn"
                  >
                    Retry
                  </button>
                </div>
            )}

            {loading ? (
                <div className="loading">Loading jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="no-jobs">
                  {searchActive ? 'No jobs found for this technology.' : 'No jobs available. Add some jobs to get started!'}
                </div>
            ) : (
                <div className="jobs-grid">
                  {jobs.map(job => (
                      <JobCard
                          key={job.jobId}
                          job={job}
                          onDelete={handleJobDeleted}
                      />
                  ))}
                </div>
            )}
          </div>
        </div>

        {showAddJob && (
            <AddJob
                onJobAdded={handleJobAdded}
                onClose={() => setShowAddJob(false)}
            />
        )}
      </div>
  );
}

export default App;