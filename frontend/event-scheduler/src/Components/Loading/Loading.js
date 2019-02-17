import React from 'react';

import './Loading.css';

const LoadingGif = () => {
  return (
    <div className="loading-spin">
      <div className="lds-circle">
        <div>
        </div>
        <p>Hold, please. We're loading...</p>
      </div>
    </div>
  )
};

export default LoadingGif;
