import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import Main from './components/Main';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Layout/>
          <Route exact path="/" component={Main}/>
          <Route path="/foobar" component={Main}/>
          {/* <Route path="/dashboard" component={Dashboard}/> */}
          <Route path="/dashboard/:accessToken?/:username?" component={Dashboard}/>
        </div>
    );
  }
}

export default App;
