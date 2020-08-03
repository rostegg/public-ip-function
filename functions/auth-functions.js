const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const createResponse = async (req, res) => {
    const ipAddress =
        req.headers['x-appengine-user-ip'] || req.headers['x-forwarded-for'] || req.headers['fastly-client-ip'];
    const countryCode = req.headers['x-appengine-country'];
    res.set({ 'Access-Control-Allow-Origin': '*' }).json({
        ip: ipAddress,
        countryCode: countryCode,
    });
};

const auth = async userId => {
    if (!userId) throw new Error(`Authentication is required.`);
    await admin.auth().getUser(userId);
    return;
};

exports.getPublicIpWithAuth = functions.https.onRequest(async (req, res) => {
    const userId = req.query.auth;

    auth(userId)
        .then(() => {
            return createResponse(req, res);
        })
        .catch(ex => {
            res.status(403).send(ex.message);
        });
});
