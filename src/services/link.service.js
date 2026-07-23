const { nanoid } = require("nanoid");

const AppError = require("../utils/appError");

const {
    createLink,
    findByShortCode,
    updateLinkVisit,
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

module.exports = {
    create,
    redirect,
    getStats,
};