const { nanoid } = require("nanoid");

const {
  createLink,
  findByShortCode,
} = require("../repositories/link.repository");

const create = async (url) => {
  let shortCode;

  do {
    shortCode = nanoid(7);
  } while (await findByShortCode(shortCode));

  return createLink({
    originalUrl: url,
    shortCode,
  });
};

module.exports = {
  create,
};