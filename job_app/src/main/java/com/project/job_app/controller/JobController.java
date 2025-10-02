package com.project.job_app.controller;

import com.project.job_app.model.Job;
import com.project.job_app.repository.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public Job createJOb(@RequestBody Job job){
        return jobRepo.save(job);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable long id) {
        if (jobRepo.existsById(id)) {
            jobRepo.deleteById(id);  // Cascade will handle TechStack deletion
            return ResponseEntity.ok("Job with ID " + id + " deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }



}
