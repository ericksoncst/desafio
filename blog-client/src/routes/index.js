import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import Article from './Article';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cadastro" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/artigo" exact component={Article} />
        </Switch>
  </BrowserRouter>
);