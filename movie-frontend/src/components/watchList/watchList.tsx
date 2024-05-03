import React from 'react';
import { Table } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Movie from '../model/Movie';
import { FaYoutube } from "react-icons/fa";



interface watchListProps {
    movies: Movie[];
}

const WatchList: React.FC<watchListProps> = ({movies}) => {

    return (
        <Table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Release Date</th>
                <th>Trailer Link</th>
                <th>Watch Status</th>
            </tr>
            </thead>
            <tbody>
                {movies.filter((movie) => movie.watched).map((movie) => (
                    <tr key={movie.title}>
                    <td><Link to={`/Reviews/${movie.imdbId}`}>{movie.title}</Link></td>
                    <td>{movie.releaseDate}</td>
                    <td>                                        
                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                            <FaYoutube/>
                        </Link></td>
                    <td>{movie.watched ? <FaHeart/> : <FaRegHeart/>}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default WatchList;