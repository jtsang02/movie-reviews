import Review from "./Review";

interface Movie {
    imdbId: string;
    backdrops: string[];
    poster: string;
    title: string;
    watched: boolean;
    trailerLink: string;
    reviewIds: Review[];
    releaseDate: string;
}

export default Movie;