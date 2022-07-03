const { Contact } = require('../../models');
const { checkResult } = require('../../helpers/sendError');
const { OK, SUCCESS } = require('../../common/http-codes');

const removeById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);
  await checkResult(result, id);

  return res.json({
    status: SUCCESS,
    code: OK,
    message: 'Contact removed',
    data: {
      result,
    },
  });
};

module.exports = removeById;
