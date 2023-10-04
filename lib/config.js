'use strict';
const yaml_config = require('node-yaml-config');
const config = yaml_config.load('./config/common.yml');

module.exports = config;
