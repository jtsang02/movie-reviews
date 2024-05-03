import React from 'react';

// Replace this with your actual data
const movies = [
  { title: 'Movie 1', trailerLink: 'http://example.com', watched: true },
  { title: 'Movie 2', trailerLink: 'http://example.com', watched: false },
  // ...
];

const WatchList: React.FC = () => {
    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Trailer Link</th>
                <th>Watch Status</th>
            </tr>
            </thead>
            <tbody>
            {movies.map((movie) => (
                <tr key={movie.title}>
                <td>{movie.title}</td>
                <td><a href={movie.trailerLink}>Trailer</a></td>
                <td>{movie.watched ? 'Watched' : 'Not Watched'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default WatchList;