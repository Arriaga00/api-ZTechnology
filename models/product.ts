import { DataTypes } from "sequelize";
import db from '../db/conection'

const product = db.define('Product', {
    id_product : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name : {
        type : DataTypes.STRING,
    },
    description : {
        type : DataTypes.STRING,
    },
    price : {
        type : DataTypes.DECIMAL
    },
    image :{
        type : DataTypes.STRING,
    }
})

export default product