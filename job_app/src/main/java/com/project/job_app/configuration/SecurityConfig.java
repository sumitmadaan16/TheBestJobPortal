package com.project.job_app.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        return provider;
    }
    @Bean
    public SecurityFilterChain secFilterChain(HttpSecurity http) throws Exception {
//        http.csrf(customizer -> customizer.disable());
        http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests(request -> request.
                requestMatchers("/register", "/login").permitAll()
                .anyRequest().authenticated());
        http.formLogin(form -> form.loginPage("/login")); // only used in stateful
//        http.httpBasic(Customizer.withDefaults()); // optional in both cases
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.logout(logout -> logout.logoutSuccessUrl("/login?logout"));
        return http.build();
    }
}
