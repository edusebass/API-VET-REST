import { sendMailToPaciente } from "../config/nodemailer.js"
import Paciente from "../models/Paciente.js"

const loginPaciente = (req,res)=>{
    res.send("Login del paciente")
}
const perfilPaciente = (req,res)=>{
    res.send("Perfil del paciente")
}
const listarPacientes = (req,res)=>{
    res.send("Listar pacientes")
}
const detallePaciente = (req,res)=>{
    res.send("Detalle del paciente")
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