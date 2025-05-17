function apiKeyAuth(req, res, next) {
    const clientKey = req.header('api-key');

    if (!clientKey || clientKey !== process.env.API_KEY) {
        return res.status(401).json({ msg: 'Forbidden: Invalid API Key' });
    }

    next();
}

module.exports = apiKeyAuth;
