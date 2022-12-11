import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
const Homepage = React.lazy(() => import("homepage/HomePage"))
const DetailsPage = React.lazy(() => import("detailspage/DetailsPage"))
const SeatSelectionPage = React.lazy(() => import("seatselectionpage/SeatSelectionPage"))


// const Homepage = React.lazy(()=>import("component_name_in_current_webpack/exposed_module_name_from_remote"))
const App = () => {
  const history = useHistory()
  const location = useLocation()
  const movieClicked = (movie) => {
    history.push(`details/${movie.id}`)
  }
  return (
    <Switch>
      <Route path="/details/:id">
        <Suspense fallback={'loading.. '}>
          <DetailsPage location={location} />
        </Suspense>
      </Route>
      <Route path="/book">
        <Suspense fallback={'loading.. '}>
          <SeatSelectionPage />
        </Suspense>
      </Route>
      <Route path="/">
        <Suspense fallback={'loading.. '}>
          <Homepage movieClicked={movieClicked} />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default App;
