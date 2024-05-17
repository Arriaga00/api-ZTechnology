import { Response , Request } from "express";
import Product from '../models/product'


export const consultProducts = async (req : Request, res: Response) =>{

    const product = await Product.findAll({
        attributes: ['id_product', 'name', 'description', 'price','image']
    })

    res.status(200).json({
        product
    })
 }


 export const saveProduct = async(req: Request, res: Response) => {

    let { name , description , price , image } = req.body

    const product = await Product.create({name , description , price , image})

    const id = product.dataValues.id_product

    res.status(200).json({
        msg : `Se registro un usuario nuevo con el id: ${id}` 
    })
}

export const updateProduct = async ( req: Request, res: Response ) => {

    const { id_product, name ,  description , price , image} = req.body

    const product = await Product.update({id_product, name ,  description , price , image}, {
        where: {
            id_product 
        }
    })

    res.status(200).json({
        msg : `el usuario con el id: ${id_product} ha sido actualizado correctamente`,
        product
    })

}

export const deleteProduct = async ( req: Request, res: Response ) => {
    const { id } = req.params

    const product = await Product.destroy({
        where : {
            id_product : id
        }
    })


    if (product === 0) res.status(404).json({msg: `No se encontró un usuario con el id: ${id}`})

    res.status(200).json({
        msg : `El usuario con el id: ${id} ha sido eliminado`
    })
}