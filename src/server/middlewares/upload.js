const multer = require('multer');
const { tmpDir } = require('../common/paths');
const { isImageType, imageTypeError } = require('./isImageType');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_');
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 256,
    fields: 10,
    fileSize: 1024 * 512,
    files: 1,
    parts: 11,
    headerPairs: 40,
  },
  fileFilter: (req, file, cb) => {
    if (isImageType(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(null, false);
    cb(new Error(imageTypeError(file.mimetype)));
  },
});

module.exports = upload;
