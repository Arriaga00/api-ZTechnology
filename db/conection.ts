import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const env = process.env

const db = new Sequelize(env.DB_NAME || 'ventapps', env.DB_USER || 'root', env.DB_PASSWORD||'', {
    host: env.DB_HOST||'localhost',
    dialect: 'mysql',
    port: Number(env.BD_PORT)
  })

  export default db