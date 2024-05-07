import { DataTypes } from "sequelize";
import db from '../db/conection'

const order_detail = db.define('Order_Detail',{
    id_order : {
        type : DataTypes.BIGINT,
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

export default order_detail