import distribucion_dependencia from "../models/Dis_dependencia.js";
import Items from "../models/items_presupuesto.js";
import Dependencia from "../models/dependencia.js";


const httpDistribucionDependencia = {
    getDisDependencia: async (req, res) => {
        try {
            const distribucion = await distribucion_dependencia.find().populate('dependencia').populate('items');
            res.json({ distribucion });

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    getDisDependenciaId: async (req, res) => {
        const { id } = req.params;
        try {
            const distribucion = await distribucion_dependencia.findById(id).populate('dependencia').populate('items');
            res.json({ distribucion });

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    postDisDependencia: async (req, res) => {
        try {
            const { codigo_presupuestal, presupuesto_inicial, ano, dependencia, items } = req.body;
            const distribucion = new distribucion_dependencia({ codigo_presupuestal, presupuesto_inicial, ano, dependencia, items });
            
            const rdependencia = await Dependencia.findById(dependencia)
            const rItems = await Items.findById(items)

            distribucion.dependencia = rdependencia
            distribucion.items = rItems

            await distribucion.save();
            res.json({ mensaje: 'Distribucion del presupuesto agregada exitosamente', distribucion });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    putDisDependencia: async (req, res) => {
        const { id } = req.params;
        const { codigo_presupuestal, presupuesto_inicial, ano, dependencia, items } = req.body;

        try {
            const distribucion = await distribucion_dependencia.findByIdAndUpdate(id, { codigo_presupuestal, presupuesto_inicial, ano, dependencia, items }, { new: true });

            if (!distribucion) {
                return res.status(404).json({ mensaje: 'La distribucion del presupuesto no existe' });
            }

            const rdependencia = await Dependencia.findById(dependencia)
            const rItems = await Items.findById(items)

            distribucion.dependencia = rdependencia
            distribucion.items = rItems

            res.json({ mensaje: 'Distribucion del presupuesto actualizado con éxito', distribucion });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisDependencia: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await distribucion_dependencia.findByIdAndRemove(id).populate('dependencia items');
            res.json({ distribucion });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });
        }
    },

    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await distribucion_dependencia.findByIdAndUpdate(id, { status: 0 }, { new: true }).populate('dependencia').populate('items');
            res.json({ distribucion });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });

        }
    },

    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await distribucion_dependencia.findByIdAndUpdate(id, { status: 1 }, { new: true }).populate('dependencia').populate('items');
            res.json({ distribucion });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });
        }
    }
};

export default httpDistribucionDependencia;
