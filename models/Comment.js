const Sequelize = require("sequelize")
const sequelize = require("../config/databaseConn")
 
const Comment = sequelize.define('comments', {
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
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    }
}, {
    timestamps: true, 
    underscored: true,
    freezeTableName: true
})

module.exports = Comment   