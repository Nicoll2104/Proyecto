import Distribucion_presupuesto from "../models/distribucion_presupuesto.js";

const helpersDistriPresupuesto = {
    validarCodigo: async (codigo_presupuestal, req) => {
        const existe = await Distribucion_presupuesto.findOne({ codigo_presupuestal });

        if (existe && req.req.method === 'POST') {
            throw new Error(`Ya existe este código`);
        } else if (existe && req.req.method === 'PUT') {
            const bodyKeys = Object.keys(req.req.body);
            if (bodyKeys.includes('codigo_presupuestal') && req.req.body.codigo_presupuestal !== existe.codigo_presupuestal) {
                throw new Error(`Ya existe este código`);
            }
        }
    },
};

export default helpersDistriPresupuesto;