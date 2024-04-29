import { DataTypes } from "sequelize"
import db from '../db/conection'

const user = db.define('User', {
    document : {
        type : DataTypes.STRING
    },
    names : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    cellphone : {
        type : DataTypes.STRING
    },
    address : {
        type : DataTypes.STRING
    },
    age : {
        type : DataTypes.INTEGER
    },
    id_roles : {
        type : DataTypes.BIGINT
    },
    state : {
        type : DataTypes.TINYINT
    },
    photo : {
        type : DataTypes.STRING
    },
    confirmPassword : {
        type : DataTypes.STRING
    }
})

export default user