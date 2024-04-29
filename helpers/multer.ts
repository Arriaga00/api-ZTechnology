import multer from 'multer'
import { v4  as uuidv4} from 'uuid'

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'uploads/')
    },
    filename : (req,file,cb) => {
        console.log(file)
        const randomName = uuidv4()
        cb(null , `${randomName}, ${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({storage})

export default upload