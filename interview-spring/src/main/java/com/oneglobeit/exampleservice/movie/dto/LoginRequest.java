package com.oneglobeit.exampleservice.movie.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}