module.exports = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map((e) => ({ [e.path]: e.message }));
            next({ message: message, status: 400 });
        }
        next();
    };
};
