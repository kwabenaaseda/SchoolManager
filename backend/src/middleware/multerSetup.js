import fs from 'fs'
import multer from 'multer'

if (!fs.existsSync('uploads/')){
    console.log(`Uploads Folder Not Found`)
    console.log(`Creating Uploads Folder . . . . .`)
    fs.mkdir('uploads/')
    console.log("Uploads Folder Created Succesfully")
    console.log("Happy Uploading!! 🔥😉")
}


const Storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploaded/')
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({storage:Storage})