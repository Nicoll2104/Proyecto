import conexio_lote_red from "../models/conexion_lote_red.js"

const helpersConexio_lote_red = {
    validarCodigo: async (codigo_auxiliar, req) => {
        const existe = await conexio_lote_red.findOne({ codigo_auxiliar });

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

export default helpersConexio_lote_red;