const express = require('express');
const interactionsRoute = express.Router();
const {getInteractions, addInteraction, deleteInteraction, updateInteraction, askAI} = require('./interactions.controller');

interactionsRoute.get('/:drugs', getInteractions);
interactionsRoute.post('/', addInteraction);
interactionsRoute.delete('/:name', deleteInteraction);
interactionsRoute.patch('/', updateInteraction);
interactionsRoute.post('/ask-ai', askAI)

module.exports = interactionsRoute;
