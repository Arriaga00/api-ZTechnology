import { DataTypes } from "sequelize";
import Order from "./order";
import Product from "./product";
import db from "../db/conection";

const order_Detail = db.define(
  "Order_Detail",
  {
    id_order: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      references: {
        model: Order,
        key: "id_order",
      },
    },
    id_product: {
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

order_Detail.belongsTo(Product, { foreignKey: "id_product", as: "product" });
export default order_Detail;
