const sendResponse = (res, status, msg) => {
    return res.status(status).json(msg);
}

module.exports = sendResponse;