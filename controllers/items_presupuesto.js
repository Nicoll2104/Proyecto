import item_presupuesto from "../models/items_presupuesto.js";

const httpItemPresupuesto = {
    getProducto: async (req, res) => {
        try {
            const productos = await item_presupuesto.find()
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getProductoId: async (req, res) => {
        const { id } = req.params;
        try {
            const productos = await item_presupuesto.findById(id)
            if (!productos) {
                return res.status(404).json({ mensaje: 'El producto no existe' });
            }
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error: 'No se encontró el ID del producto' });
        }
    },

    postProducto: async (req, res) => {
        try {
            const { codigo, nombre, descripcion, unidad_medida, precio_unitario, iva, cantidad, lote } = req.body;
            const productos = new item_presupuesto({ codigo, nombre, descripcion, unidad_medida, precio_unitario, iva, cantidad, lote }); 

            res.json({ mensaje: 'El producto se agregó con éxito', productos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putProducto: async (req,res) =>{
        const {id} = req.params;
        const {codigo, nombre, descripcion, unidad_medida,precio_unitario,iva,cantidad,lote} = req.body;
    
        try{
            const productos  =await Producto.findByIdAndUpdate(id, { codigo, nombre, descripcion, unidad_medida,precio_unitario,iva,cantidad,lote}, { new: true });

            if(!productos){
                return res.status(404).json({mensaje: 'El producto no existe' })
            }

            await productos.save();
            const rLote = await Lote.findById(lote)

            productos.lote = rLote
            res.json({ mensaje: 'Producto actualizado con éxito', productos });
        }catch(error){
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteProducto: async (req,res) =>{
        try{
            const {id} = req.params;
            const productos = await Producto.findByIdAndDelete(id);

            if(!productos){
                return res.status(404).json({ mensaje: 'El producto no existe' });
            }
            res.json({ mensaje: 'El producto ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar al producto' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const productos = await Producto.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({productos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const productos = await Producto.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({productos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
    
} 

export default httpItemPresupuesto;