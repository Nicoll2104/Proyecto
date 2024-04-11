import detalle_salida from "../models/det_Salida.js";

const httpDtSalida = {
    getDsalida: async (req,res)=>{
        const DetSalida = await detalle_salida.find().populate('idSalida').populate('idProducto');
        res.json(DetSalida);
    },

    getDsalidaId: async (req,res)=>{
        const {id}=req.params
        try{
            const DetSalida = await detalle_salida.findById(id).populate('idSalida').populate('idProducto');
            res.json({DetSalida})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postDsalida: async (req,res)=>{
        try{
            const {cantidad_Entrega,idSalida,idProducto,cantidad_pendiente}=req.body;
            const DetSalida = new detalle_salida({cantidad_Entrega,idSalida,idProducto,cantidad_pendiente});

            await DetSalida.save();
            res.json({mensaje:'El detalle salida se agrego con exito', DetSalida })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putDsalida: async (req,res)=>{
        const {id}=req.params;
        const {cantidad_Entrega,idSalida,idProducto,cantidad_pendiente}=req.body;

        try{
            const DetSalida = await detalle_salida.findByIdAndUpdate(id,{cantidad_Entrega,idSalida,idProducto,cantidad_pendiente}, {new: true});
        
            if(!DetSalida){
                return res.status(404).json({mensaje:'El detalle salida no existe' })
            }
            res.json({mensaje: 'Detalle salida actualizado con éxito',DetSalida  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteDsalida : async (req,res)=>{
        try{
            const {id} =req.params;
            const DetSalida = await detalle_salida.findByIdAndDelete(id);

            if(!DetSalida){
                return res.status(404).json({mensaje: 'El detalle salida no existe' })
            }
            res.json({mensaje: 'El detalle salida ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar el detalle salida' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const DetSalida = await detalle_salida.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({DetSalida})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const DetSalida = await detalle_salida.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({DetSalida})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpDtSalida;