const Sequalize = require('sequelize');

const db = require('../util/database')


const User = db.define('user', {

    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
    }
})



module.exports = User;