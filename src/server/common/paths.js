const { join } = require('path');

const publicDir = join(__dirname, '../../../', 'public');
const avatarsDir = join(publicDir, 'avatars');
const resultAvatarUrl = (name) => join('public', 'avatars', name);

module.exports = {
  publicDir,
  avatarsDir,
  resultAvatarUrl,
};
