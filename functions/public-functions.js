const functions = require('firebase-functions');

exports.getPublicIp = functions.https.onRequest(async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }).sendStatus(200);
    const ipAddress =
        req.headers['x-appengine-user-ip'] || req.headers['x-forwarded-for'] || req.headers['fastly-client-ip'];
    const countryCode = req.headers['x-appengine-country'];
    res.json({
        ip: ipAddress,
        countryCode: countryCode,
    });
});

exports.watchHeaders = functions.https.onRequest(async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }).sendStatus(200);
    const headers = JSON.stringify(req.headers, null, 2);
    const message = `<pre>Request headers: ${headers}</pre>`;
    res.send(message);
});
