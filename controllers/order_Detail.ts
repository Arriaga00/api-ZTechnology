import { Request, Response } from "express";
import Order_Detail from "../models/order_Detail";
import { Order, Product } from "../models/relaciones";

export const consultDetailsProducts = async (req: Request, res: Response) => {
  try {
    const detailsProducts = await Order_Detail.findAll({
      attributes: ["id", "idOrder_details", "idProduct_details", "quantity"],
    });

    res.status(200).json({
      detailsProducts,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching order details" });
  }
};

export const ConsulDetailsProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const detailOrder = await Order_Detail.findAll({
    where: {
      idOrder_details: id,
    },
    attributes: ["idOrder_details", "idProduct_details", "quantity"],
    include: [
      {
        model: Product,
        as: "product",
        foreignKey: "idProduct_details", // Añadido esto
        attributes: ["id_product", "name", "price", "image"],
      },
      {
        model: Order,
        as: "order",
        foreignKey: "idOrder_details", // Añadido esto
        attributes: ["total_price", "status", "order_date"],
      },
    ],
  });
  res.status(200).json({ detail: detailOrder });
};
