import { Request, Response } from "express";
import Client from '../models/client'
import User from '../models/user'


export const getClients = async (req: Request, res: Response) => {
    const clients = await Client.findAll({
        attributes: ['id_client', 'name', 'email', 'phone'],
        include: [{
            model: User,
            as: 'user',
            attributes: ['names']
        }]
    });


    res.status(200).json({
        clients: clients
    });
};