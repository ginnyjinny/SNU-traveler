import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import HomeContent from '../HomeContent';
import PostListContent from '../PostListContent'
import NotFoundContent from '../NotFoundContent';

import ViewPost from '../ViewPost';

import MapContent from '../WorldMap'
import WritePost from '../WritePost';

class Router extends Component {
  render() {
    // Properties
    const { user } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <main>
          <Switch>
            <Route path="/" exact>
              <MapContent user={user}/>
            </Route>

            <Route path="/posts/Korea" exact render={() => (
              <PostListContent country="Korea" user={user} />
            )} />
            <Route path="/posts/America" exact render={() => (
              <PostListContent country="America" user={user} />
            )} />
            <Route path="/posts/China" exact render={() => (
              <PostListContent country="China" user={user} />
            )} />
            <Route path="/posts/France" exact render={() => (
              <PostListContent country="France" user={user} />
            )} />

            <Route path="/writePost" exact render={() => (
              <WritePost user={user}/>
            )} />

            <Route path="/viewpost" exact component={ViewPost} />

            <Route>
              <NotFoundContent />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object
};

export default Router;
