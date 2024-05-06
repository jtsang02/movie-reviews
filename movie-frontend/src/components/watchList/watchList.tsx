import React from 'react';
import { Table } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Movie from '../../model/Movie';
import { FaYoutube } from "react-icons/fa";
import { Button } from 'react-bootstrap';


interface watchListProps {
    movies: Movie[];
    toggleWatched: (movie: Movie) => void;
}

const WatchList: React.FC<watchListProps> = ({ movies, toggleWatched }) => {

    return (
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Trailer Link</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {movies.filter((movie) => movie.watched).map((movie) => (
                    <tr key={movie.title}>
                        <td><Link to={`/Reviews/${movie.imdbId}`}>{movie.title}</Link></td>
                        <td>{movie.releaseDate}</td>
                        <td>
                            <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                <FaYoutube />
                            </Link></td>
                        <td>{
                            <Button
                                variant='outline-danger'
                                onClick={() => toggleWatched(movie)}
                            >
                                <FaTrashAlt/>
                            </Button>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default WatchList;