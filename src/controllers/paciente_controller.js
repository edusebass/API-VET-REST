import mongoose from "mongoose"
import { sendMailToPaciente } from "../config/nodemailer.js"
import Paciente from "../models/Paciente.js"

const loginPaciente = (req,res)=>{
    res.send("Login del paciente")
}
const perfilPaciente = (req,res)=>{
    res.send("Perfil del paciente")
}

const listarPacientes = async (req,res)=>{
    const pacientes = await Paciente.find({estado:true}).where('veterinario').
    equals(req.veterinarioBDD).select("-salida -createdAt -updatedAt -__v").
    populate('veterinario','_id nombre apellido email password')

    res.status(200).json(pacientes)

}

const detallePaciente = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`});
    const paciente = await Paciente.findById(id).select("-createdAt -updatedAt -__v").populate('veterinario','_id nombre apellido')
    res.status(200).json(paciente)
}

const registrarPaciente = async(req,res)=>{
    //desestructura el email
    const {email} = req.body

    //validar los campos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    //verficar si el paciente ya se encuentra registrado
    const verificarEmailBDD = await Paciente.findOne({email})

    //crear un password
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoPaciente = new Paciente(req.body)

    const password = Math.random().toString(36).slice(2)
    nuevoPaciente.password = await nuevoPaciente.encrypPassword("vet"+password)

    //enviar el correo electronico
    await sendMailToPaciente(email,"vet"+password)

    //asociar el paciente con el veterinario
    nuevoPaciente.veterinario=req.veterinarioBDD._id

    //guardar nuevo paciente
    await nuevoPaciente.save()
    res.status(200).json({msg:"Registro exitoso del paciente y correo enviado"})
}

const actualizarPaciente = (req,res)=>{
    res.send("Actualizar paciente")
}
const eliminarPaciente = (req,res)=>{
    res.send("Eliminar paciente")
}

export {
		loginPaciente,
		perfilPaciente, 
        listarPacientes,
        detallePaciente,
        registrarPaciente,
        actualizarPaciente,
        eliminarPaciente
}