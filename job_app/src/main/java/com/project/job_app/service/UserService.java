package com.project.job_app.service;

import com.project.job_app.model.User;
import com.project.job_app.model.UserPrinciple;
import com.project.job_app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo uRepo;

    @Override
    public UserDetails loadUserByUsername(String Username) throws UsernameNotFoundException {
        User user = uRepo.findByUsername(Username);
        if(user == null){
            System.out.println("User not found");
            throw new UsernameNotFoundException(Username);
        }
        return new UserPrinciple(user);
    }

    public User saveUser(User user){
        user.setPassword(new BCryptPasswordEncoder(12).encode(user.getPassword()));
        return uRepo.save(user);
    }

}
