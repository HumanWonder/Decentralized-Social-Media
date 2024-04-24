import React, { useState } from 'react';
import '../static/css/Header.css';
import logo from '../logo.svg';
import UserLogin from './UserLogin';
import { useAuthState } from './authState';
import FormMakePost from './FormMakePost';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useAuthState();

  console.log("isLoggedIn: ", isLoggedIn)

  const handleCreatePostClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = () => {
    setShowModal(false);
  };
  

  
  console.log("render");

  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark sticky-top border-bottom" data-bs-theme="dark">
        <div className="container">
          <a className="navbar-brand d-md-none" href="/#">
            <svg className="bi" width="24" height="24"></svg>
            DSM
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasLabel">DSM</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav flex-grow-1 justify-content-between">
                <li className="nav-item">
                  <a className="nav-link" href="/#">
                    <img src={logo} className="bi" width="24" height="24" alt="logo" />
                  </a>
                </li>
                <li className="nav-item"><a className="nav-link" href="/#">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/#">Explore</a></li>
                {isLoggedIn && (
                <li className="nav-item">
                  <a className="nav-link" href="/#" onClick={handleCreatePostClick}>
                    Create a Post
                  </a>
                </li>
                )}
                <UserLogin />
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create a Post</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <FormMakePost onSubmit={handleFormSubmit}/>
          </div>
        </div>
      </div>
</div>

    </>
  );
};

export default Header;
