import React, { useContext } from "react";
import { MovieContextt } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const Main = () => {
  const { filmler } = useContext(MovieContextt);
  return (
    <div className="flex justify-center flex-wrap">
      {
        filmler.map((film)=>
        <MovieCard key={film.id} {...film}/>)
      }
    </div>
  );
};

export default Main;
