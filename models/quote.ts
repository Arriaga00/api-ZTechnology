import { DataTypes } from "sequelize";
import db from '../db/conection'

const quote = db.define('Quote', {
    id_sale : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_client : {
        type : DataTypes.INTEGER
    },
    id_product : {
        type : DataTypes.INTEGER
    },
    quantity : {
        type : DataTypes.INTEGER
    },
    sale_date : {
        type : DataTypes.DATE
    },
    total_price : {
        type : DataTypes.DECIMAL
    }
},
{
    tableName: 'quotes',
    timestamps: false
}
)

export default quote