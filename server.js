const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./db/model.js');

app.use(express.static('client/dist'));
app.use(bodyParser());

app.get('/results', (req, res, next) => {
  res.json({'message': 'i like turtles'});
})

app.post('/results', (req, res, next) => {
  const row = {
    name: req.body.winner.name,
    color: req.body.winner.name
  }
  db.create(row);
  res.json({'message': 'i like turtles'});
});

app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${port}`);
})