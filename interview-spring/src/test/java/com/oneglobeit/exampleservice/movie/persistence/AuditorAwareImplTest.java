package com.oneglobeit.exampleservice.movie.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

class AuditorAwareImplTest {

    private AuditorAwareImpl auditorAware;
    private SecurityContext securityContext;

    @BeforeEach
    void setUp() {
        auditorAware = new AuditorAwareImpl();
        securityContext = mock(SecurityContext.class);
        SecurityContextHolder.setContext(securityContext);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void getCurrentAuditor_WhenNoAuthentication_ReturnsAnonymous() {
        when(securityContext.getAuthentication()).thenReturn(null);
        Optional<String> result = auditorAware.getCurrentAuditor();
        assertEquals(Optional.of("anonymous"), result);
    }

    @Test
    void getCurrentAuditor_WhenNotAuthenticated_ReturnsAnonymous() {
        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(false);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        Optional<String> result = auditorAware.getCurrentAuditor();

        assertEquals(Optional.of("anonymous"), result);
    }

    @Test
    void getCurrentAuditor_WithJwtTokenAndPreferredUsername_ReturnsPreferredUsername() {
        Map<String, Object> tokenAttributes = new HashMap<>();
        tokenAttributes.put("preferred_username", "jwtUser");

        JwtAuthenticationToken jwtToken = mock(JwtAuthenticationToken.class);
        when(jwtToken.isAuthenticated()).thenReturn(true);
        when(jwtToken.getTokenAttributes()).thenReturn(tokenAttributes);
        when(securityContext.getAuthentication()).thenReturn(jwtToken);

        Optional<String> result = auditorAware.getCurrentAuditor();

        assertEquals(Optional.of("jwtUser"), result);
    }

    @Test
    void getCurrentAuditor_WithJwtTokenAndUsername_ReturnsUsername() {
        Map<String, Object> tokenAttributes = new HashMap<>();
        tokenAttributes.put("username", "jwtUser2");

        JwtAuthenticationToken jwtToken = mock(JwtAuthenticationToken.class);
        when(jwtToken.isAuthenticated()).thenReturn(true);
        when(jwtToken.getTokenAttributes()).thenReturn(tokenAttributes);
        when(securityContext.getAuthentication()).thenReturn(jwtToken);

        Optional<String> result = auditorAware.getCurrentAuditor();

        assertEquals(Optional.of("jwtUser2"), result);
    }

    @Test
    void getCurrentAuditor_WithRegularAuthentication_ReturnsName() {
        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("regularUser");
        when(securityContext.getAuthentication()).thenReturn(authentication);

        Optional<String> result = auditorAware.getCurrentAuditor();

        assertEquals(Optional.of("regularUser"), result);
    }
}