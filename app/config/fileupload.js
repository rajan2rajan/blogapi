const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

const uploadFile = async (file, folder) => {
    try {
        await fs.fileExists(`./public/${folder}`);
    } catch (err) {
        await fs.mkdir(`./public/${folder}`);
    } finally {
        const fileName = `${folder}/${uuid()}.${req.files.images.name.split(".").pop()}`;
        await file.mv(path.join(__dirname, "../../..", "public", fileName));
        return fileName;
    }
};

module.exports = uploadFile;
