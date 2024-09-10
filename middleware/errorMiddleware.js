const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message || "An unknown error occurred",
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })

}

export default errorHandler