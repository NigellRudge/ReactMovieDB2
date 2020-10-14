import React from 'react';
import MovieHomePage from './pages/MovieHomePage';
import ShowsHomePage from './pages/ShowsHomePage';
import MenuComponent from './components/MenuComponent';
import './App.css';
import {Switch, Route} from "react-router-dom";

import ActorHomePage from "./pages/ActorHomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import ShowDetailPage from "./pages/ShowDetailPage";
import SeasonDetailPage from "./pages/SeasonDetailPage";

//TODO: Add Shimmer/skeleton loader loading indicator

class App extends  React.Component{
  constructor() {
    super();
    this.state = {
      movieList: null
    }
  }
  componentDidMount(){}
  render(){
    return (
    <div>
        <MenuComponent/>
       <Switch>
            <Route path="/movie/:movieId" component={MovieDetailPage} />
            <Route path="/movies" component={MovieHomePage} />
            <Route path="/shows/:showId/season/:seasonId" component={SeasonDetailPage} />
            <Route path="/shows/:showId" component={ShowDetailPage} />
            <Route path="/shows" component={ShowsHomePage} />
            <Route path="/actors" component={ActorHomePage} />
           <Route path="/" component={MovieHomePage}/>
       </Switch>
    </div>

    )
  }
}

export default App;
