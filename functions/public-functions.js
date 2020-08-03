const functions = require('firebase-functions');

exports.getPublicIp = functions.https.onRequest(async (req, res) => {
    const ipAddress =
        req.headers['x-appengine-user-ip'] || req.headers['x-forwarded-for'] || req.headers['fastly-client-ip'];
    const countryCode = req.headers['x-appengine-country'];
    res.set({ 'Access-Control-Allow-Origin': '*' }).json({
        ip: ipAddress,
        countryCode: countryCode,
    });
});
