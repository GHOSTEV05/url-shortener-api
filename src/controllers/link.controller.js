const { createLinkSchema } = require("../validators/link.validator");

const {
    create,
    redirect,
    getStats,
    getAllLinks,
    remove,
} = require("../services/link.service");

const createShortLink = async (req, res, next) => {
    try {
        const { url } = createLinkSchema.parse(req.body);

        const link = await create(url);

        res.status(201).json({
            success: true,
            message: "Short link created successfully",
            data: {
                originalUrl: link.originalUrl,
                shortCode: link.shortCode,
                shortUrl: `${req.protocol}://${req.get("host")}/${link.shortCode}`,
            },
        });
    } catch (error) {
        next(error);
    }
};

const redirectToOriginalUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        const originalUrl = await redirect(shortCode);

        res.redirect(originalUrl);
    } catch (error) {
        next(error);
    }
};

const getLinkStats = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        const link = await getStats(shortCode);

        res.status(200).json({
            success: true,
            data: {
                originalUrl: link.originalUrl,
                shortCode: link.shortCode,
                shortUrl: `${req.protocol}://${req.get("host")}/${link.shortCode}`,
                clicks: link.clicks,
                createdAt: link.createdAt,
                lastVisitedAt: link.lastVisitedAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getLinks = async (req, res, next) => {
    try {
        const links = await getAllLinks();

        const data = links.map((link) => ({
            originalUrl: link.originalUrl,
            shortCode: link.shortCode,
            shortUrl: `${req.protocol}://${req.get("host")}/${link.shortCode}`,
            clicks: link.clicks,
            createdAt: link.createdAt,
            lastVisitedAt: link.lastVisitedAt,
        }));

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};

const deleteShortLink = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        await remove(shortCode);

        res.status(200).json({
            success: true,
            message: "Link deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createShortLink,
    redirectToOriginalUrl,
    getLinkStats,
    getLinks,
    deleteShortLink,
};