const { Sequelize } = require('sequelize');

const { log } = require('../logger');

// create new DB client
module.exports.db = new Sequelize(process.env.DB_URI, {
  logging: msg => log.info(msg)
});