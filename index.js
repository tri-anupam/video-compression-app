const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
