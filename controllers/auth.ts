import { Request , Response } from "express";
import bcrypt from 'bcryptjs'
import User from '../models/user'
import  generateJWT  from '../helpers/generateJWT'

export const login = async (req : Request , res : Response) => {

    const { email , password } = req.body
    try {
        const login = await User.findOne({
            where : {
                email
            }
        })

       if (!login ) res.status(400).json({msg : `El usuario no existe`})

       const validPassword = bcrypt.compareSync(password, login?.dataValues.password )

       if (!validPassword) res.status(404).json({ msg : `El usuario/ contraseña no son correctos `})
       if (!login?.dataValues.state)  res.status(404).json({ msg : `El usuario esta inactivo por favor comunicarse con el servicio al cliente `})

       const token = await generateJWT(login?.dataValues.id)

       return res.status(200).json({ token , user : login})

    } catch (err) {
        console.log(err)
    }
}