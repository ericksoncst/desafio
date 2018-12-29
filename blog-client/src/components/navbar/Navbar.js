import React, { Component } from 'react';
import './style.css';

class Navbar extends Component {
  render() {
    return (
    		<div className="div-nav">
          <label className="label-navbar">E-Blog</label>
          <div className="div-link">
            <a className="link" to="/cadastro">Cadastro</a>
            <a className="link" to="/login">Login</a>
          </div>
    		</div>	
    );
  }
}

export default Navbar;