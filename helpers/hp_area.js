import Area from "../models/area.js";

const helpersArea = {
    validarNombreUnico: async (nombre, req)=>{
        const existe = await Area.findOne({ $text: { $search: nombre} });

    if(existe){
        if(req.req.method === "PUT" && req.req.body._id != existe._id){
            throw new Error(
                `Ya existe ese nombre`
            )
        }else if(req.req.method === 'POST') throw new Error(`Ya existe ese nombre`)
    }
    }
}

export default helpersArea;