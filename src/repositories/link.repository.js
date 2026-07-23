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

const updateLinkVisit = (id) => {
    return prisma.link.update({
        where: {
            id,
        },
        data: {
            clicks: {
                increment: 1,
            },
            lastVisitedAt: new Date(),
        },
    });
};

module.exports = {
    createLink,
    findByShortCode,
    updateLinkVisit,
};