import dis_depen_red from "../models/Dis_depen_red.js";
import dis_depen from "../models/Dis_dependencia.js";
import red_conoci from "../models/red_conocimiento.js";

const httpDisDepenRed ={
    getDisDepR: async (req,res) =>{
        try{
            const distribucion = await dis_depen_red.find().populate('disdepen').populate('redconoci')
            res.json({mensaje: 'Busqueda exitosa', distribucion })
        
        } catch (error){
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDisDepRId: async (req,res)=>{
        const { id } = req.params
        try{
            const distribucion = await dis_depen_red.findById(id).populate('disdepen').populate('redconoci')
            res.json({ mensaje: 'Distribucion de dependecia red de conocimiento exitosamente' , distribucion })
        }catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    }
}