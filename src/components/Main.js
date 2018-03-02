import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

const buttonStyle = {
  marginTop: '200px',  // not doing much
  color: 'blue',
  textDecoration: 'none'
};

//this is experimentation with sytled-components module
const Div = styled.div`
  background-color: : 5px outset green;
  &:hover {
   background-color: yellow;
 }
`;

class Main extends Component {
  // supposedly only needed when declaring state
  // in this case needed bc of fetch
  constructor (props) {
    super(props);
  }



  render () {
    return (
      <div className="Main">
        <div>This is Main.js</div>
        {/* This makes a get request to my server which triggers the first fetch (initiated by server) to the pocket API */}
        <Div>
          {/* this a tag is sending the browser to my server's location and the pocket-sign-in route  */}
          <a href={'http://localhost:3000/pocket-sign-in'} style={buttonStyle} type="button">Click me</a>
        </Div>
      </div>

    );
  }

}


export default Main;
