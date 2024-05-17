import Product from "./product";
import Order from "./order";
import Order_Detail from "./order_Detail";
import User from "./user";
import Client from "./client";

Order.belongsTo(Client, { foreignKey: "id_client", as: "client" });
Client.hasMany(Order, { foreignKey: "id_client", as: "orders" });

Order.belongsTo(User, { foreignKey: "id_user", as: "user" });
User.hasMany(Order, { foreignKey: "id_user", as: "orders" });

Order.hasMany(Order_Detail, { foreignKey: "idOrder", as: "details" });
Order_Detail.belongsTo(Order, { foreignKey: "id_order", as: "order" });

Product.hasMany(Order_Detail, {
  foreignKey: "idProduct",
  as: "productDetails",
});
Order_Detail.belongsTo(Product, { foreignKey: "id_product", as: "product" });

export { Order, Product, Order_Detail, User, Client };
