import React from 'react';
import TrendingPage from './pages/TrendingPage';
import ShowsHomePage from './pages/ShowsHomePage';
import MenuComponent from './components/MenuComponent';
import './App.css';
import {Switch, Route} from "react-router-dom";

import ActorHomePage from "./pages/ActorHomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import ShowDetailPage from "./pages/ShowDetailPage";
import SeasonDetailPage from "./pages/SeasonDetailPage";
import EpisodeDetailPage from "./pages/EpisodeDetailPage";
import {ActorDetailPage} from "./pages/ActorDetailPage";

export default function App(){
    return (
        <div>
          <MenuComponent/>
          <Switch>
            <Route path="/movie/:movieId" component={MovieDetailPage} />
            <Route path="/trending" component={TrendingPage} />
            <Route path="/shows/:showId/season/:seasonId/episode/:episodeId" component={EpisodeDetailPage} />
            <Route path="/shows/:showId/season/:seasonId" component={SeasonDetailPage} />
            <Route path="/shows/:showId" component={ShowDetailPage} />
            <Route path="/shows" component={ShowsHomePage} />
              <Route path="/actors/:actorId" component={ActorDetailPage} />
            <Route path="/actors" component={ActorHomePage} />
            <Route path="/" component={TrendingPage}/>
          </Switch>
        </div>
    );
}
