package com.oneglobeit.exampleservice.movie.controller;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.oneglobeit.exampleservice.movie.dto.MovieDto;
import com.oneglobeit.exampleservice.movie.dto.mapper.MovieMapper;
import com.oneglobeit.exampleservice.movie.exception.ResourceNotFoundException;
import com.oneglobeit.exampleservice.movie.persistence.entity.Movie;
import com.oneglobeit.exampleservice.movie.persistence.repository.MovieRepository;
import com.oneglobeit.exampleservice.movie.service.MovieService;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class MovieServiceTest {

	@Mock
	private MovieRepository movieRepo;

	@Mock
	private MovieMapper movieMapper;

	@InjectMocks
	private MovieService movieService;

	private UUID sampleId;
	private Movie sampleMovieEntity1;
	private Movie sampleMovieEntity2;

	private MovieDto sampleMovieDto1;
	private MovieDto sampleMovieDto2;

	private Pageable pageable;

	@BeforeEach
	void setUp() {
		sampleId = UUID.randomUUID();
		sampleMovieEntity1 = new Movie(); // Assuming Movie has a no-args constructor
		sampleMovieDto1 = MovieDto.builder().id(UUID.randomUUID()).title("Title1").originalTitle("Original Title 1")
				.synopsis("Synopsis 1").runtime(120).releaseDate(new Date()).country("Country")
				.budget(new BigDecimal("9.99")).mainCast(List.of("Actor1", "Actor2")).build();

		sampleMovieDto2 = MovieDto.builder().id(UUID.randomUUID()).title("Title2").originalTitle("Original Title 2")
				.synopsis("Synopsis 2").runtime(120).releaseDate(new Date()).country("Country")
				.budget(new BigDecimal("9.99")).mainCast(List.of("Actor1", "Actor2")).build();

		pageable = PageRequest.of(0, 10);
	}

	@Test
	void getMovie_WhenMovieExists_ShouldReturnMovieDto() {
		// Arrange
		when(movieRepo.findById(sampleId)).thenReturn(Optional.of(sampleMovieEntity1));
		when(movieMapper.toDto(sampleMovieEntity1)).thenReturn(sampleMovieDto1);

		// Act
		MovieDto result = movieService.getMovie(sampleId);

		// Assert
		assertNotNull(result);
		assertEquals(sampleMovieDto1, result);
	}

	@Test
	void getMovie_WhenMovieDoesNotExist_ShouldThrowResourceNotFoundException() {
		// Arrange
		when(movieRepo.findById(sampleId)).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(ResourceNotFoundException.class, () -> movieService.getMovie(sampleId));
	}

	@Test
	void getMovieList_ShouldReturnPageOfMovieDtos() {
		// Arrange
		Page<Movie> moviePage = new PageImpl<>(Arrays.asList(sampleMovieEntity1, sampleMovieEntity2));
		when(movieRepo.findAll(pageable)).thenReturn(moviePage);
		when(movieMapper.toDto(sampleMovieEntity1)).thenReturn(sampleMovieDto1);
		when(movieMapper.toDto(sampleMovieEntity2)).thenReturn(sampleMovieDto2);

		// Act
		Page<MovieDto> result = movieService.getMovieList(pageable);

		// Assert
		assertNotNull(result);
		assertEquals(2, result.getContent().size());
		assertEquals(sampleMovieDto1, result.getContent().get(0));
	}

	@Test
	void findMoviesByTitle_ShouldReturnPageOfMovieDtos() {
		// Arrange
		String title = "Test";
		Page<Movie> moviePage = new PageImpl<>(Arrays.asList(sampleMovieEntity1));
		when(movieRepo.findByTitleContainingIgnoreCase(title, pageable)).thenReturn(moviePage);
		when(movieMapper.toDto(sampleMovieEntity1)).thenReturn(sampleMovieDto1);

		// Act
		Page<MovieDto> result = movieService.findMoviesByTitle(title, pageable);

		// Assert
		assertNotNull(result);
		assertEquals(1, result.getContent().size());
		assertEquals(sampleMovieDto1, result.getContent().get(0));
	}

	@Test
	void createMovie_ShouldReturnCreatedMovieDto() {
		// Arrange
		when(movieMapper.toEntity(sampleMovieDto1)).thenReturn(sampleMovieEntity1);
		when(movieRepo.save(sampleMovieEntity1)).thenReturn(sampleMovieEntity1);
		when(movieMapper.toDto(sampleMovieEntity1)).thenReturn(sampleMovieDto1);

		// Act
		MovieDto result = movieService.createMovie(sampleMovieDto1);

		// Assert
		assertNotNull(result);
		assertEquals(sampleMovieDto1, result);
	}
}