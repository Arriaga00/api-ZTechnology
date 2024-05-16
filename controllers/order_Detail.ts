import { Request, Response } from "express";
import Order_Detail from "../models/order_Detail";
import { Order, Product } from "../models/relaciones";

export const consultDetailsProducts = async (req: Request, res: Response) => {
  const detailsProducts = await Order_Detail.findAll({
    attributes: ["id_order", "id_product", "quantity"],
  });

  res.status(200).json({
    detailsProducts,
  });
};

export const ConsulDetailsProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const detailOrder = await Order_Detail.findAll({
    where: {
      id_order: id,
    },
    attributes: ["id_product", "quantity"],
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id_product", "name", "price", "image"],
      },
      {
        model: Order,
        as: "order",
        attributes: ["total_price", "status", "order_date"],
      },
    ],
  });
  res.status(200).json({ detail: detailOrder });
};
