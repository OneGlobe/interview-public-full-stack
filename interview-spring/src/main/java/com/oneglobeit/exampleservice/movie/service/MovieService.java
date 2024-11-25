package com.oneglobeit.exampleservice.movie.service;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.oneglobeit.exampleservice.movie.dto.MovieDto;
import com.oneglobeit.exampleservice.movie.dto.mapper.MovieMapper;
import com.oneglobeit.exampleservice.movie.exception.ResourceNotFoundException;
import com.oneglobeit.exampleservice.movie.persistence.entity.Movie;
import com.oneglobeit.exampleservice.movie.persistence.repository.MovieRepository;

@Service
public class MovieService {

    private Logger logger = LoggerFactory.getLogger(MovieService.class);

    @Autowired
    MovieRepository movieRepo;

    @Autowired
    MovieMapper applicantMapper;

    public MovieDto getMovie(UUID id) {
        return applicantMapper.toDto(movieRepo.findById(id).orElseThrow(ResourceNotFoundException::new));
    }

    public Page<MovieDto> getMovieList(Pageable pageable) {
        return movieRepo.findAll(pageable).map(applicantMapper::toDto);
    }
    
    public Page<MovieDto> findMoviesByTitle(String title, Pageable pageable) {
		return movieRepo.findByTitleContainingIgnoreCase(title, pageable).map(applicantMapper::toDto);
	}

    public MovieDto createMovie(MovieDto dto) {
        Movie entity = movieRepo.save(applicantMapper.toEntity(dto));
        return applicantMapper.toDto(entity);
    }

}
