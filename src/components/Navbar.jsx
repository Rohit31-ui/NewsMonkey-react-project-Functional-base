import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ title, mode, text, toggleMode }) => {
  return (
    <nav className={`navbar navbar-expand-lg bg-${mode} navbar-${mode} fixed-top ` } >
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">{title}</Link>

        <button 
          className="navbar-toggler" 
          type="button"  
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/">General</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
          </ul>
          <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'}`}>
            <input 
              className="form-check-input" 
              type="checkbox" 
              onClick={toggleMode}  
              role="switch"  
              id="checkBox" 
              aria-label="Toggle dark mode"
            />
            <label className="form-check-label" htmlFor="checkBox">
              {text}
            </label>
          </div>
          <button className="btn btn-primary mx-2">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
