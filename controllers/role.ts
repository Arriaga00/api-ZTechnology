import { Request, Response } from "express";
import Role from '../models/role'

export const consultRoles = async ( req : Request , res : Response ) => {
    const role = await Role.findAll()
    res.status(200).json({
        role
    })
}

export const consultRolesById = async ( req : Request , res : Response ) => {
    const { id } = req.params
    const role = await Role.findByPk(id)

    role
    ? res.status(200).json({role})
    : res.status(404).json({
        msg : `El id: ${id} no ha sido encontrado`
    })
}

