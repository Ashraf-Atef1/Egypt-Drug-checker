const drugs_inforamtions = require("./drugs_informations.mongo");

async function getDrugsInformationDB(drugName, searchBy) {
    if (searchBy === "tradeName") {
        const drugsInformation = await drugs_inforamtions.find({  tradeName: { $regex: drugName, $options: "i" } });
        return drugsInformation;
    } else if (searchBy === "genaricName") {
        const drugsInformation = await drugs_inforamtions.find({ genericName: { $regex: drugName, $options: "i" } });
        return drugsInformation;
    } else if (searchBy === "pharmacology") {
        const drugsInformation = await drugs_inforamtions.find({ pharmacology: { $regex: drugName, $options: "i" } });
        return drugsInformation;
    } else {
        const drugsInformation = await drugs_inforamtions.find({$or: [
            { tradeName: { $regex: drugName, $options: "i" } },
            { genericName: { $regex: drugName, $options: "i" } }
          ]});
        return drugsInformation;
    }
}

async function addDrugsInformationDB(drugInformation) {
    if (!drugInformation.tradeName) throw new Error("Missing required tradeName field");
    const newDrugInformation = new drugs_inforamtions(drugInformation);
    const status = await newDrugInformation.save();
    if (!status) throw new Error("Failed to add drug information");
}

async function deleteDrugsInformationDB(tradeName) {
    if (!tradeName) throw new Error("Missing required tradeName field");
    const status = await drugs_inforamtions.deleteOne({ tradeName });
    if (status.deletedCount === 0) throw new Error("Drug information not found");
}

async function updateDrugsInformationDB(drugInformation) {
    if (!drugInformation.tradeName) throw new Error("Missing required tradeName field");
    const status = await drugs_inforamtions.updateOne({ tradeName: drugInformation.tradeName }, drugInformation);
    if (status.nModified === 0) throw new Error("Drug information not found");
}

module.exports = { getDrugsInformationDB, addDrugsInformationDB, deleteDrugsInformationDB, updateDrugsInformationDB };
