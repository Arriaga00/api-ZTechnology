import { Order, Order_Detail, User, Client } from "../models/relaciones";
import { Request, Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.findAll({
    attributes: ["id_order", "order_date", "total_price", "status"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["names"],
      },
      {
        model: Client,
        as: "client",
        attributes: ["name"],
      },
    ],
  });

  res.status(200).json({
    orders,
  });
};

export const saveOrder = async (req: Request, res: Response) => {
  let { id_client, products, total_price, id_user } = req.body;
  const Dates = new Date();
  const day = String(Dates.getDate()).padStart(2, "0");
  const month = String(Dates.getMonth() + 1).padStart(2, "0");
  const year = Dates.getFullYear();
  const toDay = `${year}-${month}-${day}`;

  // Crea la orden
  const order = await Order.create({
    id_client,
    order_date: toDay,
    total_price,
    id_user,
    status: "pending",
  });

  // Obtiene el id de la orden creada
  const id = order.dataValues.id_order;

  // Crea cada producto de la orden
  for (let product of products) {
    await Order_Detail.create({
      idOrder_details: id,
      idProduct_details: product.id_product,
      quantity: product.quantity,
    });
  }

  res.status(200).json({
    msg: `Se registró una nueva orden con el id: ${id}`,
  });
};

export const updateOrder = async (req: Request, res: Response) => {
  let { id_order, status } = req.body;

  const orders = await Order.update(
    { status },
    {
      where: {
        id_order,
      },
    }
  );

  if (!orders)
    return res
      .status(404)
      .json({ msg: `No se encontró la orden con el id: ${id_order}` });

  res.status(200).json({
    msg: `la orden con el id: ${id_order} ha sido actualizado correctamente`,
    orders,
  });
};
