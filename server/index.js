const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || config.get("serverPort");
const filePathMiddleware = require("./middlewares/filePath.middleware");

const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");

const path = require("path");

app.use(fileUpload({}));
app.use(cors());
app.use(filePathMiddleware(path.resolve(__dirname, "files")));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));
    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (error) {
    return error.message;
  }
};

start();
