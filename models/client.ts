import { DataTypes } from "sequelize";
import db from '../db/conection'

const client = db.define('Client', {
    id_client : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name : {
        type: DataTypes.STRING
    },
    email : {
        type: DataTypes.STRING
    },
    id_user : {
        type : DataTypes.BIGINT
    },
    phone : {
        type : DataTypes.NUMBER
    }
})

export default client