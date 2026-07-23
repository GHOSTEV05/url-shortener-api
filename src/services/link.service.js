const { nanoid } = require("nanoid");

const AppError = require("../utils/AppError");

const {
    createLink,
    findByShortCode,
    updateLinkVisit,
    getLinks,
    deleteLink,
    countLinks,
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

const redirect = async (shortCode) => {
    const link = await findByShortCode(shortCode);

    if (!link) {
        throw new AppError("Short link not found", 404);
    }

    await updateLinkVisit(link.id);

    return link.originalUrl;
};

const getStats = async (shortCode) => {
    const link = await findByShortCode(shortCode);

    if (!link) {
        throw new AppError("Short link not found", 404);
    }

    return link;
};

const getAllLinks = async (page, limit, search) => {
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
        getLinks(skip, limit, search),
        countLinks(search),
    ]);

    return {
        links,
        total,
    };
};

const remove = async (shortCode) => {
    const link = await findByShortCode(shortCode);

    if (!link) {
        throw new AppError("Short link not found", 404);
    }

    await deleteLink(shortCode);
};

module.exports = {
    create,
    redirect,
    getStats,
    getAllLinks,
    remove,
};