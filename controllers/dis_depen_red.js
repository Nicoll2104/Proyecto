import distribucionDependeciaRed from "../models/dis_depen_red.js";
import dis_depen from "../models/Dis_dependencia.js";
import red_conoci from "../models/red_conocimiento.js";

const httpDisDepenRed ={
    getDisDepR: async (req,res) =>{
        try{
            const distribucion = await distribucionDependeciaRed.find().populate('disdepen').populate('redconoci')
            res.json({mensaje: 'Busqueda exitosa', distribucion })
        
        } catch (error){
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDisDepRId: async (req,res)=>{
        const { id } = req.params
        try{
            const distribucion = await distribucionDependeciaRed.findById(id).populate('disdepen').populate('redconoci')
            res.json({ mensaje: 'Distribucion de dependecia red de conocimiento exitosamente' , distribucion })
        }catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDisDepR: async (req, res) =>{
        try{
            const { presupuesto_asignado,presupuesto_actual,ano,disdepen,redconoci } = req.body;
            const distribucion = new distribucionDependeciaRed({presupuesto_asignado,presupuesto_actual,ano,disdepen,redconoci});

            await distribucionDependeciaRed.save();
            
            const rdisdepen = await dis_depen.findById(disdepen);
            const rredconoci = await red_conoci.findById(redconoci);

            distribucion.disdepen = rdisdepen;
            distribucion.redconoci = rredconoci;

            res.json({ mensaje: 'La distribucion dependecia red se agrego con éxito', distribucion})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putDisDepR: async (req,res) =>{
        const {id} = req.params;
        const { presupuesto_asignado,presupuesto_actual,ano,disdepen,redconoci } = req.body;

        try{
            const distribucion = await distribucionDependeciaRed.findByIdAndUpdate(id,{ presupuesto_asignado,presupuesto_actual,ano,disdepen,redconoci }, {new: true});

            if(!distribucion){
                return res.status(404).json({mensaje: 'La distribucion dependecia red no existe' })
            }

            await distribucion.save();
            const rdisdepen = await dis_depen.findById(disdepen);
            const rredconoci = await red_conoci.findById(redconoci);

            distribucion.disdepen = rdisdepen;
            distribucion.redconoci = rredconoci;
            res.json({ mensaje: 'La distribucion dependecia red se actualizo con éxito', distribucion})
        }catch(error){
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisDepR: async (req,res) =>{
        try{
            const {id} = req.params;
            const distribucion =await distribucionDependeciaRed.findByIdAndDelete(id);

            if(!distribucion){
                return res.status(404).json({ mensaje: 'La distribucion no existe' });
            }
            res.json({ mensaje: 'La distribucion ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar la distribucion' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const distribucion = await distribucionDependeciaRed.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({distribucion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const distribucion = await distribucionDependeciaRed.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({distribucion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}

export default httpDisDepenRed;