const validateRequest = (schema) => {
    const requestFunc = async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body
            });
            return next();
        } catch (err) {
            next(err);
        }
    }
    return requestFunc;
}

module.exports = validateRequest;