import { Router } from "express";
import { check } from "express-validator";
import httpUsuario from "../controllers/usuario.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import {validarJWT} from "../middlewares/validar.js"

const router= Router();

router.get("/usuario", httpUsuario.getUsuario);

router.get("/usuario/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpUsuario.getUsuario);

router.post("/agregar",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("contrasena", "La contrasena es obligatoria").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("rol","El rol es obligatorio").not().isEmpty(),
    validarcampos
], httpUsuario.postUsuario);

router.put("/activar/:id", [
    check("id", "Digite ID").not().isEmpty(),
/*     check("id", "Digite ID").isMongoId(), */
    validarcampos
], httpUsuario.putActivar);

router.put("/inactivar/:id", [
    check("id", "Digite ID").not().isEmpty(),
/*     check("id", "Digite ID").isMongoId(), */
    validarcampos
], httpUsuario.putInactivar);


router.post('/login', httpUsuario.login);

router.delete('/eliminar/:id',httpUsuario.deleteUsuario);

export default router