require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import PropTypes from 'prop-types';


import GallerySection from './gallery/GallerySection';

class AppComponent extends React.Component {
  getChildContext () {
    return {
      color: 'yellow'
    };
  }
  render() {
    return (
      <div className="content">
        <GallerySection />
      </div>
    );
  }
}

AppComponent.childContextTypes = {
  color: PropTypes.string
};

AppComponent.defaultProps = {};

export default AppComponent;
