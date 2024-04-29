import { Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user'

 export const consultUser = async (req : Request, res: Response) =>{

    const users = await User.findAll({
        where : {
            state : 1
        }
    })

    res.status(200).json({
        msg: 'Bienvenido al modulo de usuario',
        users
    })
 }

 export const consultUserById = async(req: Request, res: Response) => {
 
    const { id } = req.params;
 
    const user = await User.findByPk(id);
 
    if (user) {
        res.status(200).json({
            user
        })
    } else {
        res.status(404).json({
            msg: "El usuario no existe"
        })
    }
}
 
export const consultUserByNames = async (req: Request, res: Response) => {
 
    let { names } = req.params;
 
    names = names.toLowerCase();
 
    const user = await User.findAll({
        where: {
            names
        }
    }); // SELECT * FROM users WHERE names = names
 
    if (user.length > 0) {
        res.status(200).json({
            user
        })
    } else {
        res.status(404).json({
            msg: "El usuario no existe"
        })
    }
}

export const saveUser = async(req: Request, res: Response) => {

    let {document, names , email , password , cellphone , address , age , photo , id_roles ,confirmPassword } = req.body


    photo = req.file?.fieldname
    console.log(photo)
    //encriptando la contrasena
    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)

    const user = await User.create({document, names , email , password , cellphone , address , age , photo , id_roles  , confirmPassword })

    const id = user.dataValues.id

    res.status(200).json({
        msg : `Se registro un usuario nuevo con el id: ${id}` 
    })
}


export const updateUser = async ( req: Request, res: Response ) => {

    const { id ,document, names , email , password , cellphone , address , age , photo , confirmPassword } = req.body

    const user = await User.update({document, names , email , password , cellphone , address , age , photo , confirmPassword }, {
        where: {
            id 
        }
    })

    res.status(200).json({
        msg : `el usuario con el id: ${id} ha sido actualizado correctamente` 
    })

    // const state = 0
    // await User.update({state},{
    //     where : {
    //         id
    //     }
    // })


}

export const deleteUser = async ( req: Request, res: Response ) => {
    const { id } = req.params

    const user = await User.destroy({
        where : {
            id
        }
    })


    if (user === 0) res.status(404).json({msg: `No se encontró un usuario con el id: ${id}`})

    res.status(200).json({
        msg : `El usuario con el id: ${id} ha sido deshabilitado`
    })
}