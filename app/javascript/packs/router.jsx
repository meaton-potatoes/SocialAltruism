/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import React from 'react';
import ReactDOM, { Redirect } from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { App, Welcome, Organizations, Organization, Profile, About, ProfileForm, Leaderboard } from 'components/index';

const routing = (
  <Router currentUser={window.currentUser}>
    <App>
      <Route exact path="/" component={Welcome} />
      <Route path="/organizations/:organization_id" component={Organization} />
      <Route exact path="/organizations" component={Organizations} />
      <Route exact path="/users/:user_id/edit" component={ProfileForm} />
      <Route exact path="/users/:user_id" component={Profile} />
      <Route exact path="/about" component={About} />
      <Route exact path="/leaderboard" component={Leaderboard} />
    </App>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
