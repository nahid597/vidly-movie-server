
const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send('Access denied. NO token provided');

    try {
        //console.log(token);
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload;
        //console.log(token);
        next();
    } catch (ex) {
        res.status(400).send('Invalid token..');
    }

}

module.exports = auth;