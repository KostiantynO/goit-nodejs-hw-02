const { Contact } = require('../../models');
const { OK } = require('../../common/http-codes');
const { resSuccessCodeData } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id, ...{ favorite } }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email subscription');

  return resSuccessCodeData(res, OK, { contacts });
};

module.exports = getAll;
