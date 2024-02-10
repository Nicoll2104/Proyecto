import items_presupuesto from "../models/items_presupuesto.js";

const httpItem = {
    getItem: async (req,res)=>{
        const items = await items_presupuesto.find()
        res.json(items);
    },

    getItemid: async (req,res)=>{
        const {id}=req.params
        try{
            const items = await items_presupuesto.findById(id)
            res.json({items})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postItem: async (req,res)=>{
        try{
            const {codigo_presupuesto, nombre, presupuesto_inicial, año}=req.body;
            const items = new items_presupuesto({codigo_presupuesto, nombre, presupuesto_inicial, año});

            await items.save();
            res.json({mensaje:'El item_presupuesto se agrego con exito', items })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putItem: async (req,res)=>{
        const {id}=req.params;
        const {codigo_presupuesto, nombre, presupuesto_inicial, año}=req.body;

        try{
            const items = await items_presupuesto.findByIdAndUpdate(id,{codigo_presupuesto, nombre, presupuesto_inicial, año}, {new: true});
        
            if(!items){
                return res.status(404).json({mensaje:'El items_presupuesto no existe' })
            }
            res.json({mensaje: 'Items_presupuesto actualizado con éxito',items  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteItem: async (req,res)=>{
        try{
            const {id} =req.params;
            const items = await items_presupuesto.findByIdAndDelete(id);

            if(!items){
                return res.status(404).json({mensaje: 'El items_presupuesto no existe' })
            }
            res.json({mensaje: 'El items_presupuesto ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar al items_presupuesto' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const items = await items_presupuesto.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({items})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const items = await items_presupuesto.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({items})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpItem;