import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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

    const url = "https://getpocket.com/v3/get";
    const reqBody = {
      "consumer_key":"75265-200ad444b793e02ce01ec6cb",
      "access_token": this.props.match.params.access_token
    };

    fetch(url,{
      method: 'post',
      headers: {
        "Host": "getpocket.com",
        "content-type": "application/json; charset=UTF-8",
        "X-Accept": "application/json"
      },
      body: JSON.stringify(reqBody)
    }).then(response => response.json())
      .then(parsedJson => {
        console.log(`response from fetch from pocket API= \n\n`, parsedJson);

      //               let result = '<p> url: </p>';
      //               parsedJson.forEach((article) => {
      //                   result +=
      //                    `<h4> Article ID: ${article.id} </h4>
      //                    <ul>
      //                      <li> Article title : ${article.title}</li>
      //                      <li> Article body : ${article.body} </li>
      //                   </ul>
      //                    `;

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
        <Route path=
          </div>

          );
          }

          }


export default Dashboard;
