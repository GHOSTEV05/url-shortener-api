const { createLinkSchema } = require("../validators/link.validator");

const {
    create,
    redirect,
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

module.exports = {
    createShortLink,
    redirectToOriginalUrl,
};