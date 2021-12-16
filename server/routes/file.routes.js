const Router = require("express");
const router = new Router();

const authMiddleware = require("../middlewares/auth.middleware");

const fileController = require("../controllers/fileController");

//create directory
router.post("", authMiddleware, fileController.createDir);

//get files from directory
router.get("", authMiddleware, fileController.getFiles);

//upload files
router.post("/upload", authMiddleware, fileController.uploadFiles);

//download files
router.get("/download", authMiddleware, fileController.downloadFile);

//delete files
router.delete("/", authMiddleware, fileController.deleteFile);

//search files
router.get("/search", authMiddleware, fileController.searchFile);

module.exports = router;
