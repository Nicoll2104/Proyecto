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
            const { cantidad, pedido_id, producto_id} = req.body
            const Det_pedido = new det_pedido({ cantidad, pedido_id, producto_id })
            await Det_pedido.save()

            res.json({ mensaje: 'Detalle Pedido agregada exitosamente', Det_pedido})
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' })
        }
    },

    putDetPedido: async (req,res) =>{
        const {id} = req.params;
        const {cantidad, pedido_id, producto_id} = req.body;

        try{
            const Det_pedido  = await det_pedido.findByIdAndUpdate(id, {cantidad, pedido_id, producto_id}, { new: true });

            if(!Det_pedido){
                return res.status(404).json({mensaje: 'El detalle pedido no existe' })
            }
            res.json({ mensaje: 'Detalle de pedido actualizado con éxito', Det_pedido });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDetPedido: async(req,res)=>{
        try {
            const {id}=req.params
            const Det_pedido= await det_pedido.findByIdAndRemove(id)
            res.json({Det_pedido})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
    
    putInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const Det_pedido=await det_pedido.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({Det_pedido})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
            
        }
    },
    putActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const Det_pedido =await det_pedido.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({Det_pedido})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}
export default httpDetPedido;