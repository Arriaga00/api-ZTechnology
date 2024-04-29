import { Request, Response } from "express";
import Order from '../models/order'


export const getOrders = async ( req: Request , res : Response) => {

    const orders = await Order.findAll()

    res.status(200).json({
        orders
    })
}

export const saveOrder = async(req: Request, res: Response) => {

    let { id_client, id_product , quantity , order_date , total_price , id_user , status } = req.body

    const orders = await Order.create({ id_client, id_product , quantity , order_date , total_price , id_user , status })

    const id = orders.dataValues.id_order

    res.status(200).json({
        msg : `Se registro una nueva orden con el id: ${id}` 
    })
}


export const updateOrder = async(req: Request, res: Response) => {

    let { id_order, id_client, id_product , quantity , order_date , total_price , id_user , status } = req.body

    const orders = await Order.update({ id_client, id_product , quantity , order_date , total_price , id_user , status },{
        where : {
            id_order
        }
    })

    res.status(200).json({
        msg : `la orden con el id: ${id_order} ha sido actualizado correctamente` ,
        orders
    })

}