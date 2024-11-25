package com.oneglobeit.exampleservice.movie.utils;  // Updated package path

import io.jsonwebtoken.Jwts;


import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtGeneratorUtil {

    @Value("${jwt.secret-key}")
    private String secretKey;

    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public String generateToken(String username, List<String> authorities) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.builder()
                .setSubject(username)
                .claim("scope", authorities)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}