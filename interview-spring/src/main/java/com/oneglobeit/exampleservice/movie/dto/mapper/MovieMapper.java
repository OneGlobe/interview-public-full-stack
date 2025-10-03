package com.oneglobeit.exampleservice.movie.dto.mapper;

import com.oneglobeit.exampleservice.movie.dto.MovieDto;
import com.oneglobeit.exampleservice.movie.persistence.entity.Movie;
import org.mapstruct.*;

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.WARN,
    injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface MovieMapper {
    MovieDto toDto(Movie entity);

    @Mapping(target = "country", defaultValue = "USA")
    Movie toEntity(MovieDto dto);
}