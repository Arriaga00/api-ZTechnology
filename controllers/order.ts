import { Model } from 'sequelize';
import { Request, Response } from "express";
import Order from '../models/order'
import Product from '../models/product'
import User from '../models/user'
import Client from '../models/client'
import Order_Detail from '../models/order_Detail'

export const getOrders = async ( req: Request , res : Response) => {
    const orders = await Order.findAll({
        attributes : ['id_order','order_date','total_price','status'],
        include: [{
            model: Order_Detail,
            as : 'details',
            attributes: ['id_order','id_product','quantity'],
            include: [{
                model: Product,
                as: 'product',
                required: false,
                attributes: ['id_product', 'name', 'description', 'price', 'image']
            }]
        },{
            model : User,
            as : 'user',
            attributes : ['names']
        },{
            model : Client,
            as : 'client',
            attributes : ['name']
        }]
    }) 

    res.status(200).json({
        orders
    })
}




export const saveOrder = async(req: Request, res: Response) => {
    let { id_client, products, total_price, id_user, } = req.body;
    const Dates = new Date()
    const day = String(Dates.getDate()).padStart(2, '0'); // Asegura que el día siempre tenga dos dígitos
    const month = String(Dates.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0
    const year = Dates.getFullYear()
    const toDay = `${year}-${month}-${day}`; // Formato 'YYYY-MM-DD'
  
    // Crea la orden
    const order = await Order.create({ id_client, order_date : toDay, total_price, id_user, status : 'pending' });
  
    // Obtiene el id de la orden creada
    const id = order.dataValues.id_order;
  
    // Crea cada producto de la orden
    for (let product of products) {
      await Order_Detail.create({ id_order:id, id_product: product.id_product, quantity: product.quantity })
    }
  
    res.status(200).json({
      msg: `Se registró una nueva orden con el id: ${id}` 
    });
};



export const updateOrder = async(req: Request, res: Response) => {

    let { id_order, id_client, id_product , quantity  , total_price , id_user , status } = req.body
    const Dates = new Date()
    const day = String(Dates.getDate()).padStart(2, '0'); 
    const month = String(Dates.getMonth() + 1).padStart(2, '0');
    const year = Dates.getFullYear()
    const toDay = `${year}-${month}-${day}`; 

    const orders = await Order.update({ id_client, id_product , quantity , order_date: toDay , total_price , id_user , status },{
        where : {
            id_order
        }
    })

    res.status(200).json({
        msg : `la orden con el id: ${id_order} ha sido actualizado correctamente` ,
        orders
    })

}