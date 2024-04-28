import React from 'react';
import Hero from '../hero/Hero';
import Movie from '../model/Movie';

interface HomeProps {
  movies: Movie[];
}

const Home: React.FC<HomeProps> = ({movies}) => {
  return (
    <div>
      <Hero movies={movies.slice(0, 5)} />
    </div>
  )
}

export default Home;