import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpRedConocimiento from "../controllers/red_conocimiento.js";

const router = Router();

router.get("/ver", httpRedConocimiento.getRedcon);

router.get("/redConomiento/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpRedConocimiento.getRedconid);

router.post("/agregar",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('id_dependencia', 'La dependencia es obligatorio').not().isEmpty(),
    validarcampos
], httpRedConocimiento.postRedcon);

router.put("/modificar/:id",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('id_dependencia', 'La dependencia es obligatorio').not().isEmpty(),
    validarcampos
], httpRedConocimiento.putRedcon);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpRedConocimiento.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpRedConocimiento.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpRedConocimiento.deleteRedcon);

export default router;