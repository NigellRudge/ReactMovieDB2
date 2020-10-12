import React from 'react';
import MovieHomePage from './pages/MovieHomePage';
import ShowsHomePage from './pages/ShowsHomePage';
import MenuComponent from './components/MenuComponent';
import './App.css';
import {Switch, Route} from "react-router-dom";

import ActorHomePage from "./pages/ActorHomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

class App extends  React.Component{
  constructor() {
    super();
    this.state = {
      movieList: null
    }
  }
  componentDidMount(){

  }
  render(){
    return (
    <div>
        <MenuComponent/>
       <Switch>
           <Route path="/movie/:movieId" component={MovieDetailPage} />
            <Route path="/movies">
                <MovieHomePage/>
            </Route>
            <Route path="/shows">
                <ShowsHomePage/>
            </Route>
           <Route path="/actors">
               <ActorHomePage/>
           </Route>
           <Route path="/">
                <MovieHomePage/>
           </Route>
       </Switch>
    </div>

    )
  }
}

export default App;
