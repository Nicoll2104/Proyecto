import lote from "../models/lote.js";

const helpersLote = {
    validarCodigo: async (codigo, req) => {
        const existe = await lote.findOne({ codigo });

        if (existe && req.req.method === 'POST') {
            throw new Error(`Ya existe este código`);
        } else if (existe && req.req.method === 'PUT') {
            const bodyKeys = Object.keys(req.req.body);
            if (bodyKeys.includes('codigo') && req.req.body.codigo !== existe.codigo) {
                throw new Error(`Ya existe este código`);
            }
        }
    },
};

export default helpersLote;