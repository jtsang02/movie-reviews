import Review from "./Review";

interface Movie {
    imdbId: string;
    backdrops: string[];
    poster: string;
    title: string;
    trailerLink: string;
    reviewIds: Review[];
    releaseDate: string;
}

export default Movie;