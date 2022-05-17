const { DataTypes } = require('sequelize');

module.exports = sequelize => sequelize.define('repo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  owner: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  forks: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  issues: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  created: {
    type: DataTypes.DATEONLY(),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    references:'user',
  }
  
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});