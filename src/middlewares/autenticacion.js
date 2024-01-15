//Importacion
import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js'

//Metodo para proteger rutas
const verificarAutenticacion = async (req,res,next)=>{
    //vvalidacion si se esta enviando el token
    if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})  
    // desestructurar el token  
    const {authorization} = req.headers
    // capturar errores del try-catch
    try {
        //verificar el token recupearado con el almacenado
        const {id,rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        // verificar el rol
        if (rol==="veterinario"){
            //Obtener el usuario
            req.veterinarioBDD = await Veterinario.findById(id).lean().select("-password")
            //continue el proceso
            next()
        }
    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({msg:e.message})
    }
}

export default verificarAutenticacion