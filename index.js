const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

//middleware
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//upload file
const upload = multer({ storage: storage });

app.post("/upload", upload.single("video"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

//compress
app.post("/compress", upload.single("video"), (req, res) => {
  //   const inputPath = req.file.path;
  //   const outputPath = `compressed-${Date.now()}.mp4`;
  //   try {
  //     const process = new ffmpeg();
  //     process
  //       .input(inputPath)
  //       .output(outputPath)
  //       .videoCodec("libx264")
  //       .audioCodec("aac")
  //       .audioBitrate("128k")
  //       .on("end", () => {
  //         res.download(outputPath, (err) => {
  //           if (err) {
  //             console.error("Error sending compressed file:", err);
  //           }
  //           // Clean up files
  //           fs.unlinkSync(inputPath);
  //           fs.unlinkSync(outputPath);
  //         });
  //       })
  //       .run();
  //   } catch (e) {
  //     console.log(e);
  //   }

  try {
    console.log(req.file);
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error during compression" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
