const { GoogleGenerativeAI } = require("@google/generative-ai");
const {getInteractionsDB, addInteractionDB, deleteInteractionDB, updateInteractionDB}= require("../model/interactions.model");

async function getInteractions(req, res) {
    try {
        const interactions = await getInteractionsDB(req.params.drugs);
        res.status(200).send(interactions);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function addInteraction(req, res) {
    try {
        await addInteractionDB(req.body);
        res.status(201).send({ message: "Interaction added successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function deleteInteraction(req, res) {
    try {
        await deleteInteractionDB(req.params.name);
        res.status(200).send({ message: "Interaction deleted successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function updateInteraction(req, res) {
    try {
        await updateInteractionDB(req.body);
        res.status(200).send({ message: "Interaction updated successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function askAI(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = req.body.prompt;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.status(200).send({ text });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
module.exports = {getInteractions, addInteraction, deleteInteraction, updateInteraction, askAI};
