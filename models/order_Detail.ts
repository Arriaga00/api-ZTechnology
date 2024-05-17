import { DataTypes, Model } from "sequelize";
import Order from "./order";
import Product from "./product";
import db from "../db/conection";

const order_Detail = db.define(
  "Order_Detail",
  {
    idOrder: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      references: {
        model: Order,
        key: "id_order",
      },
    },
    idProduct: {
      type: DataTypes.NUMBER,
      references: {
        model: Product,
        key: "id_product",
      },
    },
    quantity: {
      type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "order_details",
    timestamps: false,
  }
);

export default order_Detail;
