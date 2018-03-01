// seed data
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/codemocracyDatabase1', {useMongoClient: true});

// this is like the fields that will go in your database
const Topic = new Schema({
  _id: Number,
  title: String,
  published_at: String,
  score: Number
});

const Codex = mongoose.model('Topic', Topic);


const rawData = [
  {
    'id': 'sdk92k20elked202doe2',
    'title': 'Porting from Angular.js to Angular 2',
    'published_at': '2017-01-08T21:00:11.620Z',
    'score': 5
  },
  {
    'id': 'sdk92k20elked202doe3',
    'title': '\'Being on the edge\' by John Middleware.',
    'published_at': '2017-01-20T09:00:11.620Z',
    'score': 5
  },
  {
    'id': 'sdk92k20elked202doe4',
    'title': 'Porting from Angular.js to Angular 2',
    'published_at': '2017-01-08T21:00:11.620Z',
    'score': 5
  }
];

rawData.forEach(el => {
  // const pokeUrl = el.url.split('/');
  // const pokeId = pokeUrl[pokeUrl.length - 2];
  // const pokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
  const pokemon = new Codex({id: el.id, title: el.title, published_at: el.published_at, score: el.score});
  pokemon.save();
});
