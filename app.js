
'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const nba = require('./src/nba.js');
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({ limit:'50MB' }));
app.use(bodyParser.urlencoded({ extended:false, limit:'50MB' }));


app.get('/', async function (request, response) {
  // parameters
  //var params = request.body;

  const nbanews_list = await nba.getNewsList();
  // response
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(JSON.stringify({nbanews_list}));
});


//app.use('/api-doc', auth, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 8080;
app.listen(PORT);

