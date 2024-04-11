import Proveedor from "../models/provedor.js"

const helpersProveedor = {
    validarCedulaUnica: async (dni, req)=>{
        const existe = await Proveedor.findOne({ dni });

    if(existe){
        if(req.req.method === "PUT" && req.req.body._id != existe._id){
            throw new Error(
                `Ya existe esa cedula`
            );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe esa cedula`);
    }
    },
    ValidarCorreoUnico: async (correo, req)=>{
        const existe = await Proveedor.findOne({ correo });

    if(existe){
        if(req.req.method === "PUT" && req.req.body._id != existe._id){
            throw new Error(
                `Ya existe este correo`
            );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe este correo`)
    }
    },
    validarTelefonoUnico: async (telefono, req)=>{
        const existe = await Proveedor.findOne({ telefono });

        if(existe){
            if(req.req.method === "PUT" && req.req.body._id != existe._id){
                throw new Error(
                    `Ya existe este numero de telefono`
                );
            }else if(req.req.method === 'POST') throw new Error(`Ya existe este numero de telefono`)
        }
    }
}

export default helpersProveedor;