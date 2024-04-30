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

export const creatClient = async (req: Request, res: Response) => {
    let { name, email, phone, id_user } = req.body;

    const client = await Client.create({
        name,
        email,
        phone,
        id_user
    });

    const id = client.dataValues.id_client

    res.status(200).json({
        msg : `Se registro un cliente nuevo con el id: ${id}`,
        client: client
    });
}