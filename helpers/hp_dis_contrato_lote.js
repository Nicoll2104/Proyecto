import dis_contrato_lote from "../models/dis_contrato_lote.js"

const helpersDis_contrato_lote = {
    validarCodigo: async (codigo_auxiliar, req) => {
        const existe = await dis_contrato_lote.findOne({ codigo_auxiliar });

        if (existe && req.req.method === 'POST') {
            throw new Error(`Ya existe este código`);
        } else if (existe && req.req.method === 'PUT') {
            const bodyKeys = Object.keys(req.req.body);
            if (bodyKeys.includes('codigo_auxiliar') && req.req.body.codigo_auxiliar !== existe.codigo_auxiliar) {
                throw new Error(`Ya existe este código`);
            }
        }
    },
};

export default helpersDis_contrato_lote;