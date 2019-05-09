const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client/dist'));

app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${port}`);
})