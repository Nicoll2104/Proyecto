import Usuario from "../models/usuario.js";

const helpersUsuario = {
    validarCedulaUnica: async (cedula, req)=>{
        const existe = await Usuario.findOne({ cedula });

    if(existe){
        if(req.req.method === "PUT" && req.req.body._id != existe._id){
            throw new Error(
                `Ya existe esa cedula`
            );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe esa cedula`);
    }
    },
    ValidarCorreoUnico: async (correo, req)=>{
        const existe = await Usuario.findOne({ correo });

    if(existe){
        if(req.req.method === "PUT" && req.req.body._id != existe._id){
            throw new Error(
                `Ya existe este correo`
            );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe este correo`)
    }
    },
};

export default helpersUsuario;