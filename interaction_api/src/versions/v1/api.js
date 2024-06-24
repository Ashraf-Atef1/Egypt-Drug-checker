const drugsInformationRoute = require('./drugs_informations/routes/drugs_informations.route');
const interaction_namesRoute = require('./drugs_informations/routes/interaction_names.route');
const interactionsRoute = require('./interactions/routes/interactions.route');
const express = require('express');
const api = express.Router();

api.use('/drugs-information', drugsInformationRoute);
api.use('/interaction-names', interaction_namesRoute);
api.use('/interactions', interactionsRoute);
module.exports = api;
