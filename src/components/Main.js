require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import GallerySection from './gallery/GallerySection';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="content">
        <GallerySection />
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
