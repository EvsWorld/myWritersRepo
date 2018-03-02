import { Link } from 'react-router-dom';
import React, { Component } from 'react';


class Layout extends Component {
  render () {
    return (
      <div className="topMenu">
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    );
  }
}


export default Layout;




      // {this.props.children}
