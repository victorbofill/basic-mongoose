require('doten').config({ path: './test/e2e/.env' });
const connect = require('../lib/connect');
const mongoose = require('mongoose');

before(() => connect(process.env.MONGODB_URI));
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(friends) {
        return mongoose.connection.dropCollection(friends)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    }
};