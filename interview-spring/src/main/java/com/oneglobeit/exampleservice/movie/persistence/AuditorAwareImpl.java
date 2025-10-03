package com.oneglobeit.exampleservice.movie.persistence;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.of("anonymous");
        }

        String username;

        if (authentication instanceof JwtAuthenticationToken token) {

            username = (String) (token).getTokenAttributes().get("preferred_username");
            if (username == null) {
                username = (String) (token).getTokenAttributes().get("username");
            }
            // Check the standard 'sub' claim if neither preferred_username nor username are present
            if (username == null) {
                username = (String) (token).getTokenAttributes().get("sub");
            }

        } else {
            username = authentication.getName();
        }

        // Add null check before creating Optional to prevent NullPointerException
        if (username == null) {
            return Optional.of("anonymous");
        }

        return Optional.of(username);
    }

}
