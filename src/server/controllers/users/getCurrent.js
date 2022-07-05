const { resSuccessCodeData } = require('../../helpers');
const { OK } = require('../../common/http-codes');

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  return resSuccessCodeData(res, OK, {
    user: { email, subscription },
  });
};

module.exports = getCurrent;
