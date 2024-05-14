import { DataTypes } from "sequelize";
import db from '../db/conection'
import Order from './order'; // Importa el modelo Order

const Order_Detail = db.define('Order_Detail',{
    id_order : {
        type : DataTypes.BIGINT,
        primaryKey : true,
        references: {
            model: Order,
            key: 'id_order'
        }
    },
    id_product : {
        type : DataTypes.NUMBER
    },
    quantity : {
        type : DataTypes.NUMBER
    }
},
{
    tableName: 'order_details',
    timestamps: false
})

export default Order_Detail;
