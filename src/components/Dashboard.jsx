import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Fake from './Fake';
const btoa = require('btoa');
let uniqid = require('uniqid');
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
    };
  }
  componentWillMount () {
    this.fetchArticles();
    console.log('params: \n',this.props.match.params);
    // console.log(this.props.match.params.username);
  }

 // example of fetch and forEach:
 // fetch('https://jsonplaceholder.typicode.com/posts')
 //           .then((res) => { return res.json() })
 //           .then((data) => {
 //               let result = '<h2> Users Info </h2>';
 //               data.forEach((user) => {
 //                   result +=
 //                    `<h4> User ID: ${user.id} </h4>
 //                    <ul>
 //                      <li> User tittle : ${user.title}</li>
 //                      <li> User body : ${user.body} </li>
 //                   </ul>
 //                    `;
 //               document.getElementById('result').innerHTML = result;

  // // TODO: function to fetch articles for the user. return an array of "article" objects

  fetchArticles = () => {

    fetch('http://localhost:3000/get-articles', {
      headers: {
       'Access-Control-Allow-Origin': '*',
       'Host': 'getpocket.com',
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization': `Basic ${btoa(`access_token:${this.props.match.params.accessToken}`)}`
     }
   }).then(response => {
       return response.json();
   }).then(authors => {
      console.log(`response from fetch from pocket API= \n\n`, authors);
      let count = 0;
      let blahCount = '';
      let authorsResult = '<p> Writers: </p>';
      let renderAuthors = authors.map( name => {
        // console.log(writer);
        // count ++;
        // blahCount += 'blah ';
        return (
          <div key={uniqid()}>
            <h4> You liked {name[0]} {name[1]} times!</h4>
            {/* <ul>
              <li> Count : ${count}</li>
              <li> Blahs : ${blahCount} </li>
            </ul> */}
          </div>
        )
      })
      this.setState({authors: renderAuthors});
      console.log('state: ', this.state);
    })
    .catch(error => console.error('Error', error ));
  }

    // console.log(this.props.match.params.accessToken);

  render () {
    return (
      <div className="Dashboard">
        <h2>Writers</h2>
        {this.state.authors}
        {/* <Route path='/fake' component= {Fake}/> */}
      </div>
      );
  }
}


export default Dashboard;
