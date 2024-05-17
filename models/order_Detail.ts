import { DataTypes } from "sequelize";
import Order from "./order";
import Product from "./product";
import db from "../db/conection";

const order_Detail = db.define(
  "Order_Detail",
  {
    idOrder_details: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id_order",
      },
    },
    idProduct_details: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id_product",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    tableName: "order_details",
    timestamps: false,
  }
);

export default order_Detail;
