import './App.css';
import baseURL from './api/baseURL';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import Layout from './components/layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/notFound';
import Movie from './components/model/Movie';
import WatchList from './components/watchList/watchList';

interface Review {
  body: string;
}

function App(): React.JSX.Element {

  const url = baseURL;

  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [movie, setMovie] = useState<Movie | undefined>();
  const [reviews, setReviews] = useState<Review[]>([]);

  const getMovies = async (): Promise<void> => {
    
    await axios.get(url + '/api/v1/movies').then((response) => {
      setMovies(response.data);
    }
    ).catch((error: Error | AxiosError) => {
      console.error(error);
    });
  }

  const getMovie = async (movieId: string): Promise<void> => {

    await axios.get(url + `/api/v1/movies/${movieId}`).then((response) => {
      setMovie(response.data);
      setReviews(response.data.reviewIds);
    }
    ).catch((error: Error | AxiosError) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getMovies();
  }, [movies])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies || []} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews
                                                      getMovie={getMovie}
                                                      movie={movie}
                                                      reviews={reviews}
                                                      setReviews={setReviews}
                                                    />} />
          <Route path="/WatchList" element={<WatchList movies={movies || []} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
