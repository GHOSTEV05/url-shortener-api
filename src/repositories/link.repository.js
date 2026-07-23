const prisma = require("../config/prisma");

const createLink = (data) => {
  return prisma.link.create({
    data,
  });
};

const findByShortCode = (shortCode) => {
  return prisma.link.findUnique({
    where: {
      shortCode,
    },
  });
};

module.exports = {
  createLink,
  findByShortCode,
};