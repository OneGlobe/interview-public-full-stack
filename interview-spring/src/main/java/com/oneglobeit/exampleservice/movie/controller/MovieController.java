package com.oneglobeit.exampleservice.movie.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oneglobeit.exampleservice.movie.dto.MovieDto;
import com.oneglobeit.exampleservice.movie.service.MovieService;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private Logger logger = LoggerFactory.getLogger(MovieController.class);

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/{id}")
    public MovieDto getMovie(@PathVariable("id") UUID id) {
        return movieService.getMovie(id);
    }
    
    @GetMapping("/search")
    public Page<MovieDto> findMoviesByTitle(@RequestParam("title") String title, Pageable pageable) {
        return movieService.findMoviesByTitle(title, pageable);
    }

    @GetMapping()
    public Page<MovieDto> getMovieList(Pageable pageable) {
        return movieService.getMovieList(pageable);
    }

    @PostMapping()
    public MovieDto createMovie(@RequestBody MovieDto applicant) {
        return movieService.createMovie(applicant);
    }

}
