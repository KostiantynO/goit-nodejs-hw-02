const { join } = require('path');

const tmpDir = join(__dirname, '../../../', 'tmp');
const publicDir = join(__dirname, '../../../', 'public');
const avatarsDir = join(publicDir, 'avatars');

const makeUploadPath = async (imageName) => join(avatarsDir, imageName);

const makeAvatarUrl = async (imageName) => join('public', 'avatars', imageName);

module.exports = {
  tmpDir,
  publicDir,
  avatarsDir,
  makeUploadPath,
  makeAvatarUrl,
};
