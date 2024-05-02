package dev.josiah.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId) {
        return movieRepository.findMovieByImdbId(imdbId);
    }

    public Optional<Movie> updateMovieByFields(String imdbId, Map<String, Object> payload) {
        Optional<Movie> movie = movieRepository.findMovieByImdbId(imdbId);
        if (movie.isPresent()) {
            payload.forEach((key, value) -> {
                switch (key) {
                    case "title":
                        movie.get().setTitle((String) value);
                        break;
                    case "watched":
                        movie.get().setWatched((Boolean) value);
                        break;
                }
            });
            return Optional.of(movieRepository.save(movie.get()));
        }
        return Optional.empty();
    }
}
