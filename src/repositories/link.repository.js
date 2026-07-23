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

const getLinks = () => {
    return prisma.link.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const deleteLink = (shortCode) => {
    return prisma.link.delete({
        where: {
            shortCode,
        },
    });
};

module.exports = {
    createLink,
    findByShortCode,
    updateLinkVisit,
    getLinks,
    deleteLink,
};