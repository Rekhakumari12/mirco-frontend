import React, { Suspense, useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";

//dynamically load remote components
const MovieCard = React.lazy(() => import("components/MovieCard"))

import "./HomeContent.scss";

const dummyItem = [{ name: "Dummy Movie" }]

const HomeContent = (props) => {
  const [movies, setMovies] = useState(dummyItem);

  useEffect(async () => {
    // Add the logic to load the movies from server and set to the state
    const resp = await fetch("http://localhost:5555/movies");
    const data = await resp.json();
    setMovies(data);
    console.log(data);
  }, []);
  console.log(movies, "nnn");
  const movieClicked = (item) => {
    if (typeof props.movieClicked === "function") {
      props.movieClicked(item);
    }
  };

  const renderMovieList = () => {
    let items = movies.map((item) => {
      console.log(item.name);
      return (
        <div onClick={() => movieClicked(item)} key={item.name}>
          <MovieCard title={item.name} imageUrl={item.imageUrl} />
        </div>
      );
    });

    return items;
  };

  return (
    <div className="home-content-container">
      <QuickBooking></QuickBooking>
      <div className="movies-container">
        <Suspense fallback={'Loading..'}>
          {renderMovieList()}
        </Suspense>
      </div>
    </div>
  );
};

export default HomeContent;
