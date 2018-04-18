const mongoose = require('mongoose');

module.exports = function(dbUri) {
    const promise = mongoose.connect(dbUri);

    mongoose.connection.on('Connected', () => {
        console.log('Mongoose default connection open to ' + dbUri);
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection terminated.');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return promise;
};