const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const UPLOADS_FOLDER = path.resolve(__dirname, "..", "..", "uploads");
const TMP_FOLDER = path.resolve(UPLOADS_FOLDER, "tmp");
const MEALS_FOLDER = path.resolve(UPLOADS_FOLDER, "meals");
const INGREDIENTS_FOLDER = path.resolve(UPLOADS_FOLDER, "ingredients");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  UPLOADS_FOLDER,
  TMP_FOLDER,
  MULTER,
  MEALS_FOLDER,
  INGREDIENTS_FOLDER,
};
