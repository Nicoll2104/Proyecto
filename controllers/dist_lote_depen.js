import dist_lote_depen from "../models/dist_lote_depen.js";
import dis_Contrato_Lote from "../models/dis_contrato_lote.js";
import dis_depen from "../models/dependencia.js";

const httpDisLoteDepen = {
    getDisLoteD: async (req, res) => {
        try {
            const distribucion = await dist_lote_depen.find().populate('disContratoLote').populate('disdepen');
            res.json({ mensaje: 'Búsqueda exitosa', distribucion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getDisLoteDId: async (req, res) => {
        const { id } = req.params;
        try {
            const distribucion = await dist_lote_depen.findById(id).populate('disContratoLote').populate('disdepen');
            if (!distribucion) {
                return res.status(404).json({ mensaje: 'Distribución de lote y dependencia no encontrada' });
            }
            res.json({ mensaje: 'Distribución de lote y dependencia encontrada exitosamente', distribucion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    postDisLoteD: async (req, res) => {
        try {
            const { presupuesto_asignado, presupuesto_actual, disContratoLote, disdepen } = req.body;
            const distribucion = new dist_lote_depen({ presupuesto_asignado, presupuesto_actual, disContratoLote, disdepen });

            const rdisContratoLote = await dis_Contrato_Lote.findById(disContratoLote);
            const rdisdepen = await dis_depen.findById(disdepen);

            distribucion.disContratoLote = rdisContratoLote;
            distribucion.disdepen = rdisdepen;

            await distribucion.save();

            res.json({ mensaje: 'La distribución lote-dependencia se agregó con éxito', distribucion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putDisLoteD: async (req, res) => {
        const { id } = req.params;
        const { presupuesto_asignado, presupuesto_actual, disContratoLote, disdepen } = req.body;

        try {
            const distribucion = await dist_lote_depen.findById(id);

            if (!distribucion) {
                return res.status(404).json({ mensaje: 'La distribución de lote y dependencia no existe' });
            }

            const rdisContratoLote = await dis_Contrato_Lote.findById(disContratoLote);
            const rdisdepen = await dis_depen.findById(disdepen);

            distribucion.presupuesto_asignado = presupuesto_asignado;
            distribucion.presupuesto_actual = presupuesto_actual;
            distribucion.disContratoLote = rdisContratoLote;
            distribucion.disdepen = rdisdepen;

            await distribucion.save();

            res.json({ mensaje: 'La distribución lote-dependencia se actualizó con éxito', distribucion });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisLoteD: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await dist_lote_depen.findByIdAndDelete(id);

            if (!distribucion) {
                return res.status(404).json({ mensaje: 'La distribución de lote y dependencia no existe' });
            }
            res.json({ mensaje: 'La distribución de lote y dependencia ha sido eliminada' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await dist_lote_depen.findByIdAndUpdate(id, { status: 0 }, { new: true });
            res.json({ mensaje: 'La distribución de lote y dependencia se inactivó exitosamente', distribucion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucion = await dist_lote_depen.findByIdAndUpdate(id, { status: 1 }, { new: true });
            res.json({ mensaje: 'La distribución de lote y dependencia se activó exitosamente', distribucion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default httpDisLoteDepen;
