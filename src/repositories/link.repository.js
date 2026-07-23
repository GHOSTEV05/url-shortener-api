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

const getLinks = (skip, take, search) => {
    return prisma.link.findMany({
        where: search
            ? {
                originalUrl: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : undefined,
        skip,
        take,
        orderBy: {
            createdAt: "desc",
        },
    });
};

const countLinks = (search) => {
    return prisma.link.count({
        where: search
            ? {
                originalUrl: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : undefined,
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
    countLinks,
};