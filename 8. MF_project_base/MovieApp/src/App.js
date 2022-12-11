import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import DetailsPage from "./components/DetailsPage/DetailsPage.jsx";
// import Homepage from "./components/Homepage/Homepage.jsx";
import BookPage from "./components/BookPage/BookPage.jsx";
const Homepage = React.lazy(() => import("homepage/HomePage"))

// const Homepage = React.lazy(()=>import("component_name_in_current_webpack/exposed_module_name_from_remote"))
const App = () => {
  return (
    <Switch>
      <Route path="/details">
        <DetailsPage></DetailsPage>
      </Route>
      <Route path="/book">
        <BookPage></BookPage>
      </Route>
      <Route path="/">
        <Suspense fallback={'loading.. '}>
          <Homepage />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default App;
