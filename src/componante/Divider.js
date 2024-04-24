import React from 'react';
import '../static/css/Divider.css'

const Divider = () => {
  return (
<div className="position-relative overflow-hidden p-3 m-md-3 text-center bg-body-tertiary" id='toto'>
    <div className="col-md-6 mx-auto my-5">
      <h1 className="display-3 fw-bold">Decentralized Social Media</h1>
      <h3 className="fw-normal text-muted mb-3">Évite les images, on n’a pas les thunes pour ça.</h3>
    </div>
    <hr></hr>
  </div>
  );
};

export default Divider;
