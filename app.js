const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3000, () => {
  console.log('PORT RUNNING on 3000');
});
