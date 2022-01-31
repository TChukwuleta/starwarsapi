const Sequelize = require("sequelize")
require("dotenv").config()

const config = {
    dialect: 'postgres', 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}

let sequelize 

if(process.env.DATABASE_URL){
    sequelize = new Sequelize(process.env.DATABASE_URL, config)
}
else{
    sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, config)
}


module.exports = sequelize