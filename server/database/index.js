const { Sequelize } = require('sequelize');
const { log } = require('../logger');

// create new DB client
const db = new Sequelize(process.env.DB_URI, {
  logging: msg => log.info(msg)
});

// array for defining models
const modelDefiners = [
	require('./models/User'),
	require('./models/Repo'),
];

// define all models according to their files.
for (const definer of modelDefiners) {
	definer(db);
}

// associate models
const { user, repo } = db.models;
user.hasMany(repo, { foreignKey: 'user_id' });
repo.belongsTo(user, { foreignKey: 'user_id' });

// exporting the DB client
module.exports = db;