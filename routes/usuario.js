import { Router } from "express";
import { check } from "express-validator";
import httpUsuario from "../controllers/usuario.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import helpersUsuario from "../helpers/hp_usuario.js";

const router = Router();

router.get("/ver", httpUsuario.getUsuario);

router.get("/usuario/:id", httpUsuario.getUsuarioid);

router.post("/agregar",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("cedula", "La cédula es obligatoria y debe tener entre 7 y 10 caracteres").isLength({ min: 7, max: 10 }),
    check('correo', 'El correo tiene que llevar @ y es obligatorio').isEmail().notEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }), 
    check("contrasena", "La contrasena es obligatoria").not().isEmpty(),
    check("rol","El rol es obligatorio").not().isEmpty(),
    check('cedula').custom(helpersUsuario.validarCedulaUnica),
    check('correo').custom(helpersUsuario.ValidarCorreoUnico),
    validarcampos
], httpUsuario.postUsuario);

router.put("/modificar/:id",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("cedula", "La cédula es obligatoria y debe tener entre 7 y 10 caracteres").isLength({ min: 7, max: 10 }),
    check('correo', 'El correo tiene que llevar @ y es obligatorio').isEmail().notEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }), 
    check("contrasena", "La contrasena es obligatoria").not().isEmpty(),
    check("rol","El rol es obligatorio").not().isEmpty(),
    check('cedula').custom(helpersUsuario.validarCedulaUnica),
    check('correo').custom(helpersUsuario.ValidarCorreoUnico),
    validarcampos
],httpUsuario.putUsuario);

router.put("/inactivar/:id", httpUsuario.putInactivar);

router.put("/activar/:id", httpUsuario.putActivar);

router.post("/login",[
    check("correo","Digite su correo").not().isEmpty(),
    check("contrasena","Digite su contraseña").not().isEmpty(),
] ,httpUsuario.login)

router.delete("/eliminar/:id",httpUsuario.deleteUsuario)

export default router;