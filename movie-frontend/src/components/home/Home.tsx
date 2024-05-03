import React from 'react';
import Hero from '../hero/Hero';
import Movie from '../model/Movie';

interface HomeProps {
  movies: Movie[];
}

const Home: React.FC<HomeProps> = ({movies}) => {
  return (
    <div>
      <Hero movies={movies} />
    </div>
  )
}

export default Home;