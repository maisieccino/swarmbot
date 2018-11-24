const fs = require("fs");
const util = require("util");
const { sendPhoto } = require("./telegram");

const readFileAsync = util.promisify(fs.readFile);

const path = "/home/mbell/Pictures/beams-blue.jpg";
readFileAsync(path).then(buf => {
  sendPhoto(buf);
});
