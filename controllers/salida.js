import salida from "../models/salida.js";

const httpSalida = {
     getsalida: async (req, res) => {
        try {
            const Salidas = await salida.find().populate('idUsuario').populate('idPedido');
            res.json(Salidas);
            console.log(Salidas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }, 
     /* getsalida: async (req,res)=>{
        const Salidas = await salida.find()
        res.json(Salidas);*/


    getsalidaId: async (req,res)=>{
        const {id}=req.params
        try{
            const Salidas = await salida.findById(id).populate('idUsuario').populate('idPedido');
            res.json({Salidas})
        }catch(error){
            res.status(400).json({error:'No encontramos el id'})
        }
    },
    

    postsalida: async (req,res)=>{
        try{
            const {fecha_entrega,entregado,idUsuario,idPedido}=req.body;
            const Salidas = new salida({fecha_entrega,entregado,idUsuario,idPedido});

            await Salidas.save();
            res.json({mensaje:'La salida se agrego con exito', Salidas })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putsalida: async (req,res)=>{
        const {id}=req.params;
        const {fecha_entrega,entregado,idUsuario,idPedido}=req.body;

        try{
            const Salidas = await salida.findByIdAndUpdate(id,{fecha_entrega,entregado,idUsuario,idPedido}, {new: true});
        
            if(!Salidas){
                return res.status(404).json({mensaje:'El salida no existe' })
            }
            res.json({mensaje: 'salida actualizado con éxito',Salidas  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deletesalida : async (req,res)=>{
        try{
            const {id} =req.params;
            const Salidas = await salida.findByIdAndDelete(id);

            if(!Salidas){
                return res.status(404).json({mensaje: 'El salida no existe' })
            }
            res.json({mensaje: 'La salida ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar la salida' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Salidas = await salida.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({Salidas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Salidas = await salida.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({Salidas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpSalida;