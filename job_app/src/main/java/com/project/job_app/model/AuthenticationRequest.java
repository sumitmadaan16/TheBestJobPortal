package com.project.job_app.model;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String username;
    private String password;
}