import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const MovieContextt = createContext()

const MovieContext = ({children}) => {
  const [filmler, setFilmler] = useState([])

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

  const getirMovies=()=>{
    axios.get(BASE_URL).then((res)=>setFilmler(res.data.results))
  }

  useEffect(() => {
    getirMovies();
  })

  return (
    <MovieContextt.Provider value={{filmler}}>
      {children}
    </MovieContextt.Provider>
  )
}

export default MovieContext