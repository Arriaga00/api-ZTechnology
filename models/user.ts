import { DataTypes , Model} from "sequelize"
import db from '../db/conection'

interface User extends Model {
    document : string,
    names : string,
    email : string,
    password : string,
    cellphone : string,
    address : string,
    age : number,
    id_roles : bigint,
    state : boolean,
    photo: string,
    confirmPassword : string,
    blocked : boolean,
    falledLogin : number,
    lasFalledLogin : Date
}

const user = db.define<User>('User', {
    document : {
        type : DataTypes.STRING
    },
    names : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    cellphone : {
        type : DataTypes.STRING
    },
    address : {
        type : DataTypes.STRING
    },
    age : {
        type : DataTypes.INTEGER
    },
    id_roles : {
        type : DataTypes.BIGINT
    },
    state : {
        type : DataTypes.TINYINT
    },
    photo : {
        type : DataTypes.STRING
    },
    confirmPassword : {
        type : DataTypes.STRING
    },
    blocked :{
        type : DataTypes.TINYINT
    },
    falledLogin: {
        type : DataTypes.NUMBER
    },
    lasFalledLogin : {
        type : DataTypes.DATE
    }
},
{
    tableName: 'users',
    timestamps: false
}
)

export default user