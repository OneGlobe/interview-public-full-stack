package com.oneglobeit.exampleservice.movie.persistence.repository;

import com.oneglobeit.exampleservice.movie.persistence.entity.Movie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MovieRepository extends JpaRepository<Movie, UUID> {
    Page<Movie> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
