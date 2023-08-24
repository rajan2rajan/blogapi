module.exports = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const errorMessages = err.message || 'Internal Server Error';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errorMessages,
    });
    next();
};
