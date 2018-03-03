import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Fake  from './Fake';
const btoa = require('btoa');

// import { Route } from 'react-router';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

const buttonStyle = {
  marginTop: '50px'
};

class Dashboard extends Component {
  // supposedly only needed when declaring state
  // in this case needed bc of etch
  constructor (props) {
    super(props);
    this.state = {
      authors: [],
    }
  }
  componentDidMount () {
    this.fetchArticles ();
    console.log('params: \n',this.props.match.params);
    // console.log(this.props.match.params.username);
  }


  fetchArticles = () => {

    // this is a regular fetch to my server at it's get-articles route
    fetch('http://localhost:3000/get-articles',{
      headers: {
        'Host': 'getpocket.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`access_token:${this.props.match.params.accessToken}`)}`
      }
    }).then(response => response.json())
      .then(parsedJson => {
        console.log(`response from my server \n\n`, parsedJson);
        // this is where to store in local storage

      })
      .catch(error => console.error('Error', error ));
    }

    // TODO: func to accept array of objects, scrape the page and return that article's author.
    // TODO: func to accept array of authors and find the top 15 most common. // TODO: func to display those writers
    // TODO: func to follow those writers on twitter



    // console.log(this.props.match.params.accessToken);

  render () {
    return (
      <div className="Dashboard">
        This is Dashboard.jsx
        {/* {result} */}
      </div>

    );
  }

}


export default Dashboard;
