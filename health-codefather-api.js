const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mockApiUtils = require('./mock-api-utils');

const app = express();
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3030;

const dataDir = __dirname + '/mock_data';

app.all('/*', (req, res) => {
  switch (req.method) {
    case 'GET':
      console.log('✅  [GET]', req.url);
      handleGeneric(req, res);
      break;
    case 'POST':
      console.log('✅  [POST]', req.url, req.body);
      handlePOST(req, res);
      break;
    case 'PUT':
      console.log('✅  [PUT]', req.url, req.body);
      handleGeneric(req, res);
      break;
    case 'DELETE':
      console.log('✅  [DELETE]', req.url, req.body);
      handleGeneric(req, res);
      break;
    default:
      res.status(500).send(`Unrecognized method ${req.method}`);
  }
});

const errorResponse = res => {
  res
    .status(500)
    .send("Couldn't satisfy your request, please see server logs.");
};

const handleGET = async (req, res, fallback = errorResponse) => {
  const response = await mockApiUtils.loadResponseDataAsJSON(dataDir, req.url, req.query);
  if (response) {
    console.log('✅  [GET]', req.url);
    res.setHeader('Content-Type', 'application/json');
    res.send(response);
  } else {
    fallback(req, res);
  }
};

const handleGeneric = handleGET;

const handlePOST = (req, res, fallback = errorResponse) => {
  const response = mockApiUtils.loadResponseData(dataDir, req.url, req.query);
  if (response) {
    console.log('✅  [POST]', req.url);
    res.status(200).send(response);
  } else {
    fallback(req, res);
  }
};

const sendErrorResponse = res => {
  setTimeout(function() {
    res.status(500).send(() => {});
  });
  return;
};

const handlePUT = (req, res) => {
  console.log('✅  [PUT]', req.url, req.body);
  res.sendStatus(200);
};

const handleDELETE = (req, res) => {
  console.log('✅  [DELETE]', req.url, req.body);
  res.sendStatus(200);
};

app.listen(port, function() {
  console.log(`listening on ${port} 🛰`);
});
