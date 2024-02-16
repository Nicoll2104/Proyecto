import Distribucion_presupuesto from "../models/distribucion_presupuesto.js";

const helpersDistriPresupuesto = {
    validarCodigo: async (codigo_presupuestal, req)=>{
        const existe = await Distribucion_presupuesto.findOne({codigo_presupuestal});

    if(existe){
        if(req.req.method === "PUT" && req.req.body._id != existe._id){
            throw new Error(
                `Ya existe este codigo`
            );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe este codigo`)
    }
    },
};

export default helpersDistriPresupuesto;