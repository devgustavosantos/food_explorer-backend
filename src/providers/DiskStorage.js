const fs = require("fs");
const path = require("path");
const uploadConfigs = require("../configs/upload");

class DiskStorage {
  async saveFile(file, folder) {
    await fs.promises.rename(
      path.resolve(uploadConfigs.TMP_FOLDER, file),
      path.resolve(folder, file)
    );

    return file;
  }

  async deleteFile(file, folder) {
    const filePath = path.resolve(folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
