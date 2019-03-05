

const { User } = require('../../../model/user')
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.AuthjsonwebToken', () => {

    it('should return valid json web token', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId()
                .toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })
})

