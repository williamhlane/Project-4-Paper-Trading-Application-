const { Sequelize, DataTypes } = require('sequelize');
const db = require('./databaseconnect');
//This is the users table. It has the username password and the Balance the person has///
const User = db.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance:{
        type: DataTypes.BIGINT,
        allowNull: true
    },
    stocksOwned: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    /////////////////////////////////
});