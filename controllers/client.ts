import { Request, Response } from "express";
import Client from '../models/client'


export const getClients = async ( req: Request , res : Response) => {

    const client = await Client.findAll()

    res.status(200).json({
        client
    })
}
