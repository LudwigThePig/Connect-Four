const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client/dist'));

app.get('/results', (req, res, next) => {
  res.json({'message': 'i like turtles'});
})

app.post('/results', (req, res, next) => {
  console.log(req.body);
  res.json({'message': 'i like turtles'});
});

app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${port}`);
})