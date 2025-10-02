package com.project.job_app.repository;

import com.project.job_app.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job,Long > {
    @Query("SELECT DISTINCT j FROM Job j JOIN j.techStack ts WHERE Lower(ts.name) = Lower(:techName)")
    List<Job> findByTechStack(@Param("techName") String techName);

}
