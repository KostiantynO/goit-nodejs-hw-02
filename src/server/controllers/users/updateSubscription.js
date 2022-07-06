const { User } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { OK } = require('../../common/http-codes');
const { sendSuccessCodeData } = require('../../helpers/resSuccess');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true },
  );

  await checkResult(
    user,
    _id,
    `User with _id='${_id}' not found (possible 'connection error' or 'db write error')`,
  );

  return sendSuccessCodeData(res, OK, {
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = updateSubscription;
