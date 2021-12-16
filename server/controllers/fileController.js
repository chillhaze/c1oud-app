const fileService = require("../services/fileService");
const config = require("config");
const fs = require("fs");
const User = require("../models/User");
const File = require("../models/File");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;

      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDir(req, file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(req, file);

        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();

      return res.json(file);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getFiles(req, res) {
    try {
      const { sort } = req.query;
      let files;
      switch (sort) {
        case "name":
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ name: 1 });

          break;

        case "type":
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ type: 1 });

          break;
        case "date":
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ date: 1 });
          break;

        default:
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          });
          break;
      }

      return res.json({ files });
    } catch (error) {
      return res.status(500).json({ message: "Can not get files" });
    }
  }

  async uploadFiles(req, res) {
    try {
      const uploadedFile = req.files.file;

      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      });

      const user = await User.findOne({ _id: req.user.id });

      if (user.usedSpace + uploadedFile.size > user.diskSpace) {
        return res.status(400).json({ message: "Not enough space on disk" });
      }

      user.usedSpace = user.usedSpace + uploadedFile.size;

      let path;
      if (parent) {
        path = `${req.filePath}\\${user._id}\\${parent.path}\\${uploadedFile.name}`;
      } else {
        path = `${req.filePath}\\${user._id}\\${uploadedFile.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File already exists" });
      }

      uploadedFile.mv(path);

      const type = uploadedFile.name.split(".").pop();
      let filePath = uploadedFile.name;
      if (parent) {
        filePath = parent.path + "\\" + uploadedFile.name;
      }

      const dbFile = new File({
        name: uploadedFile.name,
        type,
        size: uploadedFile.size,
        path: filePath,
        parent: parent ? parent._id : null,
        user: user._id,
      });

      await dbFile.save();
      await user.save();

      res.json(dbFile);
    } catch (error) {
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });

      const path = fileService.getPath(req, file);

      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({ message: "Download error3" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Download error" });
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });

      if (!file) {
        return res.status(400).json({ message: "File not found" });
      }

      fileService.deleteFile(req, file);
      await file.remove();
      return res.json({ message: "File was deleted" });
    } catch (error) {
      console.log(error);
      // return res.status(400).json({ message: "dir is not empty" });
      return res.status(400).json({ message: error.message });
    }
  }

  async searchFile(req, res) {
    try {
      const searchName = req.query.search;

      let files = await File.find({ user: req.user.id });
      files = files.filter((item) => item.name.includes(searchName));

      return res.json(files);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Search error" });
    }
  }
}

module.exports = new FileController();
