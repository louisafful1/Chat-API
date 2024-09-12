// Routes that do not exist
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// error in routes
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Handling CastError for invalid ObjectId
    if (err.name === "CastError" && err.kind ==="ObjectId") {
        statusCode = 404
        err.message = "Resource not found"
    }

    res.status(statusCode).json({
        message: err.message || "An unknown error occurred",
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })

}

export {notFound, errorHandler} 