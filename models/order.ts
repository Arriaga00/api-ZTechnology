import { DataTypes } from "sequelize";
import Order_Detail from './order_Detail'
import Client from './client'
import User from './user'
import db from "../db/conection";

const order = db.define('Order', {
    id_order : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    id_client : {
        type : DataTypes.INTEGER,
        references : {
            model : Client,
            key : 'id_client'
        }
    },
    order_date : {
        type : DataTypes.DATE
    },
    total_price : {
        type : DataTypes.DECIMAL
    },
    id_user : {
        type : DataTypes.BIGINT,
        references : {
            model : User,
            key : 'id'
        }
        
    },
    status : {
        type : DataTypes.STRING
    }
},
{
    tableName: 'orders',
    timestamps: false
})

order.hasMany(Order_Detail, {foreignKey:'id_order', as : 'details'});
order.belongsTo(User, {foreignKey : 'id_user' , as : 'user'})
order.belongsTo(Client, {foreignKey : 'id_client' , as : 'client'})


export default order