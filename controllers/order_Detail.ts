import { Request, Response } from "express";
import Order_Detail from "../models/order_Detail";


export const consultDetailsProducts = async ( req: Request , res : Response) => {

    const detailsProducts = await Order_Detail.findAll(
        {attributes : ['id_order','id_product','quantity']}
    )

    res.status(200).json({
        detailsProducts
    })
}