module.exports = (req, res, next) => {
    res.success = (status, message) => {
        res.status(status).json({
            success: true,
            message: message,
        });
    };
    next();
};
