const Sequelize = require("sequelize")
const sequelize = require("../config/databaseConn")
 
const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    }, 
    public_ip: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Comment  