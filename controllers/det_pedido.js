import det_pedido from "../models/det_pedido.js";

const httpDetPedido ={
    getDetPedido: async (req, res) => {
        try {
            const Det_pedido = await det_pedido.find()
            res.json({ Det_pedido })

        } catch (error) {
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDetPedidoId: async (req, res) => {
        const { id } = req.params
        try {
            const Det_pedido = await det_pedido.findById(id)
            res.json({ Det_pedido })

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDetPedido: async (req, res) => {
        try {
            const { cantidad} = req.body
            const areas = new area({ nombre, presupuesto, ficha_id })
            await areas.save()

            res.json({ mensaje: 'Area agregada exitosamente' })
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' })
        }
    },

    putArea: async (req,res) =>{
        const {id} = req.params;
        const {nombre, presupuesto, ficha_id} = req.body;

        try{
            const areas  = await area.findByIdAndUpdate(id, { nombre, presupuesto, ficha_id }, { new: true });

            if(!areas){
                return res.status(404).json({mensaje: 'El area no existe' })
            }
            res.json({ mensaje: 'Area actualizado con éxito', areas });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteArea: async(req,res)=>{
        try {
            const {id}=req.params
            const areas= await area.findByIdAndRemove(id)
            res.json({areas})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
    
    putInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const areas=await area.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({areas})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
            
        }
    },
    putActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const areas=await area.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({areas})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}
export default httpDetPedido;