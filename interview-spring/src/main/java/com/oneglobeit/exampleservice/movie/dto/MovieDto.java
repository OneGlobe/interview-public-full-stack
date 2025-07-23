package com.oneglobeit.exampleservice.movie.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import java.util.Date;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MovieDto {
    private UUID id;
    
    private String title;
    private String originalTitle;
    private String synopsis;
    private Integer runtime; // in minutes
    private Date releaseDate;
    private String country;
    private BigDecimal budget;
    private List<String> mainCast;
    
    // Auditable fields
    private String createdBy;
    private Instant createdTimestamp;
    private String lastModifiedBy;
    private Instant lastModifiedTimestamp;
}