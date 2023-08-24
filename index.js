const express = require("express");
const compress = require("./videoCompression");
const fileUpload = require("./helper/fileUpload");
const { uploadFile } = require("./s3");
const PORT = 8080;

const app = express();
app.use(express.static("public"));

app.post(
  "/compressVideo",

  fileUpload.single("video"),
  async (req, res, next) => {
    var vidPath = req.file.path;
    try {
      compress(vidPath)
        .then((data) => {
          console.debug(data);
          res.download(data.outputPath);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      throw err;
    }
  }
);
app.listen(PORT, () => {
  console.debug("server is up ");
});
