import { Request, Response, NextFunction } from 'express';
import jwt , { JwtPayload }  from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()
const env = process.env

interface RequestWithId extends Request {
    id?: string;
}

export const validateJWT = (req: RequestWithId, res: Response, next: NextFunction) => {
    const bearerHeader = req.header('Authorization');

    if (!bearerHeader) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    try {
        const decoded = jwt.verify(token, env.SECRET_PRIVATE_KEY || 'default_secret_key');

        if (typeof decoded === 'object' && 'id' in decoded) {
            req.id = (decoded as JwtPayload).id as string;
            next();
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
