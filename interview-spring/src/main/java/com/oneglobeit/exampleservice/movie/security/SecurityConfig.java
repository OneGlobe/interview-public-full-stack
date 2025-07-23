package com.oneglobeit.exampleservice.movie.security;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig {

	private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

	@Value("${cors.allowedorigins:default}")
	String corsAllowedOrigins;

	@Value("${jwt.secret-key}")
	private String secretKey;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		logger.debug("CONFIGURING HTTP");

		http.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.headers(headers -> headers.frameOptions().disable()) // Allow H2 console frames
				.authorizeHttpRequests(authReqCustomizer -> authReqCustomizer
						.requestMatchers("/api/auth/**").permitAll()
						.requestMatchers("/h2-console/**").permitAll()
						.requestMatchers("/actuator/**").permitAll()
						.anyRequest().authenticated())
				.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())))
				.sessionManagement(
						sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	public JwtDecoder jwtDecoder() {
		byte[] key = secretKey.getBytes(StandardCharsets.UTF_8);
		SecretKeySpec secretKey = new SecretKeySpec(key, "HmacSHA256");
		return NimbusJwtDecoder.withSecretKey(secretKey).build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedOrigins(Arrays.asList(corsAllowedOrigins));
		configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
