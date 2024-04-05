import distribucion_dependencia from "../models/dis_dependencia.js";
/* import Dependencia from "../models/dependencia.js";
 */
const httpDistribucionDependencia = {
    getDisDependencia: async (req, res) => {
        try {
            const distribucion = await distribucion_dependencia.find().populate('dependencia');
            res.json({ mensaje: 'Busqueda Exitosa', distribucion });

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    getDisDependenciaId: async (req, res) => {
        const { id } = req.params;
        try {
            const distribucion = await distribucion_dependencia.findById(id).populate('dependencia');
            res.json({ mensaje: 'Distribucion de la dependencia encontrada con éxito', distribucion });

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    postDisDependencia: async (req, res) => {
        try {
            const { codigo_presupuestal, presupuesto_asignado, presupuesto_actual, ano, dependencia } = req.body;
            const distribucion = new distribucion_dependencia({ codigo_presupuestal, presupuesto_asignado, presupuesto_actual, ano, dependencia });
            
/*             const rdependencia = await Dependencia.findById(dependencia)

            distribucion.dependencia = rdependencia */

            await distribucion.save();
            res.json({ mensaje: 'Distribucion de la dependencia agregada exitosamente', distribucion });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    putDisDependencia: async (req, res) => {
        const { id } = req.params;
        const { codigo_presupuestal, presupuesto_asignado, presupuesto_actual, ano, dependencia } = req.body;

        try {
            const distribucion = await distribucion_dependencia.findByIdAndUpdate(id, { codigo_presupuestal, presupuesto_asignado, presupuesto_actual, ano, dependencia }, { new: true });

            if (!distribucion) {
                return res.status(404).json({ mensaje: 'La distribucion de la dependencia no existe' });
            }

/*             const rdependencia = await Dependencia.findById(dependencia)

            distribucion.dependencia = rdependencia */

            res.json({ mensaje: 'Distribucion de la dependencia actualizada con éxito', distribucion });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisDependencia: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await distribucion_dependencia.findByIdAndRemove(id).populate('dependencia items');
            res.json({ mensaje: 'Distribucion de la dependencia eliminada con éxito', distribucion });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });
        }
    },

    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await distribucion_dependencia.findByIdAndUpdate(id, { status: 0 }, { new: true }).populate('dependencia');
            res.json({ mensaje: 'Distribucion de la dependencia inactivada con éxito', distribucion });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });

        }
    },

    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await distribucion_dependencia.findByIdAndUpdate(id, { status: 1 }, { new: true }).populate('dependencia');
            res.json({ mensaje: 'Distribucion de la dependencia activada con éxito', distribucion });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });
        }
    }
};

export default httpDistribucionDependencia;
