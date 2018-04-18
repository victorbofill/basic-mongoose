const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/friends';

connect(MONGODB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});