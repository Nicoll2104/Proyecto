import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpUsuario from "../controllers/usuario.js";

const router = Router();

router.get("/ver", httpUsuario.getUsuario);

router.get("/usuario/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpUsuario.getUsuarioid);

router.post("/agregar",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check('correo', 'El correo tiene que llevar @ y es obligatorio').isEmail().notEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("contrasena", "La contrasena es obligatoria").not().isEmpty(),
    check("rol","El rol es obligatorio").not().isEmpty(),
    validarcampos
], httpUsuario.postUsuario);

router.post("/login", httpUsuario.login)

router.put("/modificar/:id",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check('correo', 'El correo tiene que llevar @ y es obligatorio').isEmail().notEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("contrasena", "La contrasena es obligatoria").not().isEmpty(),
    check("rol","El rol es obligatorio").not().isEmpty(),
    validarcampos
],httpUsuario.putUsuario);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpUsuario.putInactivar);

router.put("activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpUsuario.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpUsuario.deleteUsuario)

export default router;