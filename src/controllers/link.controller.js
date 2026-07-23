const { createLinkSchema } = require("../validators/link.validator");

const {
    listLinksQuerySchema,
} = require("../validators/linkQuery.validator");

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
        const { page, limit, search } = listLinksQuerySchema.parse(req.query);

        const { links, total } = await getAllLinks(
            page,
            limit,
            search
        );

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
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                search,
            },
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