import React, { Fragment } from 'react';

import './Loading.css';

const LoadingGif = () => {
  return (
    <Fragment className="loading-spin">
      <div className="lds-circle">
        <div>
        </div>
        <p>Hold, please. We're loading...</p>
      </div>
    </Fragment>
  )
};

export default LoadingGif;
