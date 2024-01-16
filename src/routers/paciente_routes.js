import {Router} from 'express'
const router = Router()

//Ruta para listar todos los pacientes
router.post('/paciente/login',(req,res)=>res.send("Login del paciente"))

//Ruta para ver el detalle de un paciente en particular
router.get('/paciente/perfil',(req,res)=>res.send("Perfil del paciente"))

//Ruta para registrar un paciente
router.get('/pacientes',(req,res)=>res.send("Listar pacientes"))

//Ruta para obtener un paciente en especifico
router.get('/paciente/:id',(req,res)=>res.send("Detalle del paciente"))


router.post('/paciente/registro',(req,res)=>res.send("Registrar paciente"))
router.put('/paciente/actualizar/:id',(req,res)=>res.send("Actualizar paciente"))
router.delete('/pacientes/eliminar/:id',(req,res)=>res.send("Eliminar paciente"))

export default router