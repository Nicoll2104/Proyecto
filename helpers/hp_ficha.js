import ficha from "../models/ficha.js"

const helpersFicha = {
    validarCodigo: async (codigo_ficha, req)=>{
        const existe = await ficha.findOne({codigo_ficha});

    if(existe){
        if(req.req.method === "PUT" && req.req.body._id != existe._id){
            throw new Error(
                `Ya existe este codigo`
            );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe este codigo`)
    }
    },
};

export default helpersFicha;