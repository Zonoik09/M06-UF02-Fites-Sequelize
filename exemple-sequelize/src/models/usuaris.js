const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: false
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false
    },
    data_registre: {
       type: DataTypes.STRING(10),
       allowNull: false,
    },
    idioma: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: false
    }
}, {
    timestamps: true,
    tableName: 'Users',
    underscored: true
});

module.exports = User;