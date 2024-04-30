import { DataTypes } from "sequelize";
import db from '../db/conection'
import User from './user';  // Importa el modelo User

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
        type : DataTypes.BIGINT,
        references: {  
            model: User,
            key: 'id'
        }
    },
    phone : {
        type : DataTypes.NUMBER
    }
},
{
    tableName: 'clients',
    timestamps: false
});

client.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

export default client;
