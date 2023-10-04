'use strict';
const bunyan = require('bunyan');

module.exports = config => {
    const bunyanConfig = [];
    const levels = Object.keys(config && config.levels ? config.levels : []);

    levels.forEach(level => {
        const bunyanLevel = config.levels[level];
        if (!bunyanLevel) return;

        if (level === 'debug' && config.level !== 'debug') return;

        const logger = { level };

        if (bunyanLevel === 'STDOUT') {
            logger.stream = process.stdout;
        } else if (bunyanLevel === 'STDERR') {
            logger.stream = process.stderr;
        } else if (bunyanLevel) {
            logger.path = bunyanLevel;
        } else {
            return;
        }

        bunyanConfig.push(logger);
    });

    return bunyan.createLogger({ name: config && config.name ? config.name : 'Default', streams: bunyanConfig });
};
