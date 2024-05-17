import { DataTypes, Model } from "sequelize";
import Order from "./order";
import Product from "./product";
import db from "../db/conection";

interface OrderDetail extends Model {
  id_order: number;
  id_product: number;
  quantity: number;
}

const order_Detail = db.define<OrderDetail>(
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

export default order_Detail;
