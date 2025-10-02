package com.project.job_app.model;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class TechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "TechStack{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
