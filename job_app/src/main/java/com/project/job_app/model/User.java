package com.project.job_app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name ="users")
public class User {
    @Id
    private String username;
    private String password;
}
