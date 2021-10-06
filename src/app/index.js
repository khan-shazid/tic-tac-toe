import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

// import  {isTokenExpired} from "./services/Util";

import PlayTicTacToe from './pages/tictactoe/PlayTicTacToe';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route { ...rest } render={ matchProps => (
            <DefaultLayout>
                <Component { ...matchProps } />
            </DefaultLayout>
        ) }/>
    );
};

class Root extends Component {
    render() {
        // const token = JSON.parse(localStorage.getItem('token'));
        return (
            <Router>
                <Switch>
                  <PublicRoute path="/" component={ PlayTicTacToe }/>
                </Switch>
            </Router>
        );
    }
}

export default Root;
