const { Pool } = require("pg")
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'starwarsdb',
    password: `${process.env.PG_PASSWORD}`,
    port: 5432
})

module.exports = pool

// const { Pool } = require("pg")
// require("dotenv").config()

// const isProduction = process.env.NODE_ENV === "production"

// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

// const pool = new Pool({
//     connectionString: isProduction ? process.env.DATABASE_URL : connectionString
//     // ssl: {
//     //     rejectUnauthorized: false
//     // }
// })

// module.exports = pool