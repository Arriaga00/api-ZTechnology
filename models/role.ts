import { DataTypes } from "sequelize";
import db from '../db/conection'

const role = db.define('Role',{
    name : {
        type: DataTypes.STRING
    }
},
{
    
    tableName: 'roles',
    timestamps: false
}
)

export default role