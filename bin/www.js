const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const config = require('../lib/config');
const appPromise = require('../app');
const debug = require('debug');
const http = require('http');

const logger = require('../lib/logger');

const log = logger(config.logger);

appPromise.then((app) => {

    const port = normalizePort(process.env.PORT || '3001');
    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port);

    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
        log.info(`server listening on ${addr.port}`);
    }
});

