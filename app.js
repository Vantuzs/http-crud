const express = require('express');
const ThingController = require('./controllers/Thing.controller');
const { basicErrorHandler } = require('./errorHandler');
const { validateThing } = require('./utils/validationThings');

const app = express();
const bodyParser = express.json();

app.use(bodyParser);

// http://localhost:5000/thing
app.post('/thing', validateThing, ThingController.createThing);
// http://localhost:5000/thing
app.get('/thing/:id', ThingController.getOne); // 1 thing
// http://localhost:5000/things
app.get('/things', ThingController.getAllThings); // all things
app.delete('/thing/:id', ThingController.deleteOne); // delete one
app.put('/thing/:id', validateThing , ThingController.updateOne); // update one

app.use(basicErrorHandler);

module.exports = app;