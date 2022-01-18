const handlerError = (error, res) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
    });
};

const notFound = (req, res, next) => {
    const error = new Error("Resources not found");
    error.status = 404;
    next(error)
}

module.exports = {
    handlerError,
    notFound
}