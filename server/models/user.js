// model
'use strict';
const mongoose = require('mongoose');
const db = require('../db');

const Schema = db.Schema;

const Topic = new Schema({
  id: Number,
  title: String,
  // published_at: String,
  score: Number
});

const Codex = mongoose.model('Topic', Topic)
// This thing finds all ( {} )
exports.getAll = () => Codex.find({}, (err, data) => {
  if (err) console.log('topic not found');
  else return data;
});

exports.getOne = (id) => {
  return Codex.find({"id": id}, (err, data) => {
    if (err) console.log('topic not found');
    else return data;
  })
};


exports.create = async (title) => {
  const score = 5;
  const rand = 50 + Math.floor(Math.random() * 50);
  const topic = new Codex({id: rand, title: title, score: score});
  const res = await topic.save();
  // return res.name;
}

module.exports.codex = Codex;
