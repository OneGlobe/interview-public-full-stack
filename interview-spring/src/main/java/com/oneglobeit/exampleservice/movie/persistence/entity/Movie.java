package com.oneglobeit.exampleservice.movie.persistence.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.ElementCollection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Movie extends Auditable {
    @Id
    @GeneratedValue
    private UUID id;
    
    private String title;
    private String originalTitle;
    private String synopsis;
    private Integer runtime;
    
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    
    private String country;
    private BigDecimal budget;
    
    @ElementCollection
    private List<String> mainCast;
}