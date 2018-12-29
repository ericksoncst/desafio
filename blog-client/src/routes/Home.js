import React, { Component, Fragment } from 'react';

import Navbar from '../components/navbar/Navbar';
import Feed from '../components/feed/Feed';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Feed />
      </Fragment>
    );
  }
}

export default Home;