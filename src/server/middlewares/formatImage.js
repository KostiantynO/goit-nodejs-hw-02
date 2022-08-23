const { read } = require('jimp');

const SIZE = 250;

const formatImage = async (req, res, next) => {
  const { path: tmpUpload } = req.file;

  try {
    const image = await read(tmpUpload);

    await image
      .resize(SIZE, SIZE) // resize
      .writeAsync(tmpUpload); // save

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = formatImage;
