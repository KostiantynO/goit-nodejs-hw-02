// gimp supported
const imageTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/tiff',
];
// 'image/svg+xml', 'image/webp', 'image/apng', 'image/avif'

const expectedImageTypes = `Expected one of: ${imageTypes.join(', ')}`;

const isImageType = (mimetype) => imageTypes.some((type) => type === mimetype);

const imageTypeError = (mimetype) => `Got ${mimetype}. ${expectedImageTypes}`;

module.exports = {
  isImageType,
  imageTypeError,
};
