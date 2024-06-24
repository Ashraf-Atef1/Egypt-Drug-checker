const interaction_drug_names = require("./interaction_names.mongo");

async function getInteractionNames(interactionNames) {
    const interactionNamesArray = interactionNames.split("+").sort();
    const newInteractionNames = await interaction_drug_names.find({ drugName: { $in: interactionNamesArray }});
    console.log(newInteractionNames);
    return newInteractionNames;
}

async function addInteractionName({drugName, interactionName}) {
    if (!drugName || !interactionName) throw new Error("Missing required fields");
    const newInteractionName = new interaction_drug_names({ drugName, interactionName });
    const status = await newInteractionName.save();
    if (!status) throw new Error("Failed to add interaction name");
}

async function deleteInteractionName(drugName) {
    if (!drugName) throw new Error("Missing required fields");
    const status = await interaction_drug_names.deleteOne({ drugName });
    if (status.deletedCount === 0) throw new Error("Interaction name not found");
}

async function updateInteractionName({drugName, interactionName}) {
    if (!drugName || !interactionName) throw new Error("Missing required fields");
    const status = await interaction_drug_names.updateOne({drugName}, {interactionName});
    if (status.nModified === 0) throw new Error("Interaction name not found");
}
module.exports = {getInteractionNames, addInteractionName, deleteInteractionName, updateInteractionName};
