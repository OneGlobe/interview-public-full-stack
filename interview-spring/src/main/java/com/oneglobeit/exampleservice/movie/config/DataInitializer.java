package com.oneglobeit.exampleservice.movie.config;

import com.oneglobeit.exampleservice.movie.persistence.entity.User;
import com.oneglobeit.exampleservice.movie.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final int NUMBER_OF_REVIEWERS = 3;
    
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        // Create reviewer users in a loop from 1 to N (where N = NUMBER_OF_REVIEWERS)
        for (int i = 1; i <= NUMBER_OF_REVIEWERS; i++) {
            try {
                userService.createUser("reviewer" + i, "password", "reviewer" + i + "@example.com", Set.of(User.Role.REVIEWER));
                System.out.println("Created reviewer " + i);
            } catch (RuntimeException e) {
                System.out.println("Reviewer " + i + " user already exists");
            }
        }
    }
}