import React, { Component } from 'react';

// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

const buttonStyle = {
  marginTop: '50px'
};


class Main extends Component {
  // supposedly only needed when declaring state
  // in this case needed bc of fetch
  constructor (props) {
    super(props);
    this.state = {
      request_token: ''
    }
  }



//

// Send request to pocket to get request code
  // fetchUserData = () => {
  //   fetch('http://localhost:3000/pocket-sign-in')
  //   .then(response => response.json())
  //   .then(response => console.log('Success', response))
  //   .catch(error => console.error('Error', error));
  // }



  render () {
    // console.log(`From Main.js. 'this.state.movies': `,this.state.movies);
    return (
      <div className="Main">
        This is Main.js
        <a href={'http://localhost:3000/pocket-sign-in'} style={buttonStyle} type="button"
             value="Don't bother clicking, it'll redirect">Click me</a>
        </div>

    );
  }

}

// https://getpocket.com/login?e=4


export default Main;
