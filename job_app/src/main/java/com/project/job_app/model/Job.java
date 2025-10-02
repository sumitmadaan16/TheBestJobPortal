package com.project.job_app.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long jobId;
    private String jobTitle;
    private String jobDescription;
    private int experience;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name ="job_id")
    private List<TechStack> techStack = new ArrayList<>();

    public List<TechStack> getTechStack() {
        return techStack;
    }

    public void setTechStack(List<TechStack> techStack) {
        this.techStack = techStack;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public long getJobId() {
        return jobId;
    }

    public void setJobId(long jobId) {
        this.jobId = jobId;
    }

    @Override
    public String toString() {
        return "Job{" +
                "jobId=" + jobId +
                ", jobTitle='" + jobTitle + '\'' +
                ", jobDescription='" + jobDescription + '\'' +
                ", experience=" + experience +
                ", techStack=" + techStack +
                '}';
    }
}

// Dummy Data
//{
//        "jobId": 1,
//        "jobTitle": "Software Engineer",
//        "jobDescription": "Responsible for developing and maintaining software applications.",
//        "experience": 3,
//        "techStack": [
//        {
//        "techId": 1,
//        "name": "Java",
//        "jobId": 1
//        },
//        {
//        "techId": 2,
//        "name": "Spring Boot",
//        "jobId": 1
//        },
//        {
//        "techId": 3,
//        "name": "React",
//        "jobId": 1
//        }
//        ]
//        }
