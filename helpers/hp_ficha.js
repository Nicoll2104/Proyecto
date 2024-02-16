import ficha from "../models/ficha.js";

const helpersFicha = {
    validarCodigo: async (codigo_ficha, req) => {
        const existe = await ficha.findOne({ codigo_ficha });

        if (existe && req.req.method === 'POST') {
            throw new Error(`Ya existe este código`);
        } else if (existe && req.req.method === 'PUT') {
            const bodyKeys = Object.keys(req.req.body);
            if (bodyKeys.includes('codigo_ficha') && req.req.body.codigo_ficha !== existe.codigo_ficha) {
                throw new Error(`Ya existe este código`);
            }
        }
    },
};

export default helpersFicha;
