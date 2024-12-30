import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import { seedDb } from '../utils/seedDb.js'

const host = process.env.MYSQL_HOST
const port = process.env.MYSQL_PORT
const user = process.env.MYSQL_USER_NAME
const password = process.env.MYSQL_PASSWORD
const database = process.env.MYSQL_DB_NAME

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
})

const connectDb = async () => {
  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

    // Check if the database is empty
    const [rows] = await connection.query(
      `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ?`,
      [database]
    )

    if (rows[0].count === 0) {
      await seedDb() // Seed the database only if it's empty
    } else {
      await sequelize.sync()
    }

    await sequelize.authenticate()
    console.log(`MYSQL connected !!`)
    // await sequelize.drop()
    console.log('All models were synchronized successfully.')
    // await seedDb()
  } catch (err) {
    console.error('MYSQL connection error', err)
    process.exit(1)
  }
}

export { sequelize, connectDb }
