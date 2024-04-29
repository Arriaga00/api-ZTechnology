import  express, {Application}  from "express";
import cors from "cors"
import userRoutes from '../routes/user'
import roleRoutes from '../routes/role'
import Login from '../routes/auth'
import productRoutes from '../routes/product'
import orderRoutes from '../routes/order'
import clientRoutes from '../routes/client'
import dotenv from 'dotenv'

dotenv.config()

class Server {
    private app: Application
    private port : string | undefined 

    private apiPaths = {
        users : '/api/usuarios',
        role : '/api/role',
        auth : '/api/auth',
        product : '/api/product',
        order : '/api/order',
        client : '/api/client'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3000'
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use('/uploads', express.static('uploads'))
    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes)
        this.app.use(this.apiPaths.role, roleRoutes)
        this.app.use(this.apiPaths.product, productRoutes)
        this.app.use(this.apiPaths.auth, Login)
        this.app.use(this.apiPaths.order, orderRoutes)
        this.app.use(this.apiPaths.client, clientRoutes)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Corriendo en el puerto ${this.port}`)
        })
    }
}

export default Server