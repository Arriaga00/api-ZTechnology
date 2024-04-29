import { DataTypes } from "sequelize";
import db from "../db/conection";

const order = db.define('Order', {
    id_order : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_client : {
        type : DataTypes.INTEGER,
    },
    id_product : {
        type : DataTypes.INTEGER,
    },
    quantity : {
        type : DataTypes.INTEGER
    },
    order_date : {
        type : DataTypes.DATE
    },
    total_price : {
        type : DataTypes.DECIMAL
    },
    id_user : {
        type : DataTypes.BIGINT
    },
    status : {
        type : DataTypes.ENUM('pending', 'completed', 'denied')
    }
})

export default order