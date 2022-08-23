const { unlink, rename } = require('fs/promises');
const { OK } = require('../../common/http-codes');
const { makeAvatarUrl, makeUploadPath } = require('../../common/paths');
const { resSuccessCodeData } = require('../../helpers');
const { User } = require('../../models');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const imageName = `${_id}_${originalname}`;

  try {
    const resultUpload = await makeUploadPath(imageName);
    await rename(tmpUpload, resultUpload);

    const avatarURL = await makeAvatarUrl(imageName);
    const updated = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true },
    );

    return await resSuccessCodeData(res, OK, {
      avatarURL: updated.avatarURL,
    });
  } catch (error) {
    await unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
