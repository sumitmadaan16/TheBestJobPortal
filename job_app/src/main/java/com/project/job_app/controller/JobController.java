package com.project.job_app.controller;

import com.project.job_app.model.Job;
import com.project.job_app.repository.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {
    @Autowired
    private JobRepo jobRepo;

    @GetMapping
    public List<Job> getAllJob(){
        return jobRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJob(@PathVariable long id) {
        Optional<Job> job = jobRepo.findById(id);
        return job.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Job>> findByTechStack(@RequestParam String tech) {
        List<Job> job = jobRepo.findByTechStack(tech);
        if(job.isEmpty()){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(job);
        }
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            job.setPostedBy(username);
            Job savedJob = jobRepo.save(job);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating job");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable long id, @RequestBody Job jobDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<Job> jobOptional = jobRepo.findById(id);

        if (jobOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Job existingJob = jobOptional.get();

        if (!existingJob.getPostedBy().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can only edit jobs that you posted");
        }

        existingJob.setJobTitle(jobDetails.getJobTitle());
        existingJob.setJobDescription(jobDetails.getJobDescription());
        existingJob.setExperience(jobDetails.getExperience());
        existingJob.setTechStack(jobDetails.getTechStack());

        Job updatedJob = jobRepo.save(existingJob);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<Job> jobOptional = jobRepo.findById(id);

        if (jobOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Job existingJob = jobOptional.get();

        // Check if the user is the one who posted this job
        if (!existingJob.getPostedBy().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can only delete jobs that you posted");
        }

        jobRepo.deleteById(id);
        return ResponseEntity.ok("Job with ID " + id + " deleted successfully");
    }
}