'use strict';

const fs = require('fs');
const writeJsonFile = require('write-json-file');
const loadJsonFile = require('load-json-file');

const readWrite = async () => {
  await  writeJsonFile('foo.json', {
        guesswho: true,
        fuckyou: true,
        fuckyoutoobitch: "you wish"
      })
      .then(() => {
        console.log('done saving to json');
    });


  await loadJsonFile('foo.json').then(json => {
    console.log(json);
      //=> {
      // guesswho: true,
      // fuckyou: true
    // }
  });
}

readWrite();



  // fs.readFile(foo.json, 'utf8', function (err, data) {
  //   try {
  //     data = JSON.parse(data)
  //     console.log(data);
  //   } catch (e) {
  //     // Catch error in case file doesn't exist or isn't valid JSON
  //   }
  //   if (data && data.msgs) db.msgs = data.msgs;
  // });
