import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpArea_tematica from "../controllers/area_tematica.js";
import helpersArea from "../helpers/hp_area_tematica.js"

const router = Router();

router.get("/ver", httpArea_tematica.getAreaTematica);

router.get("/areaTematica/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpArea_tematica.getAreaTematicaid);

router.post("/agregar",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('nombre').custom(helpersArea.validarNombreUnico),
    validarcampos
], httpArea_tematica.postAreaTematica);

router.put("/modificar/:id",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('nombre').custom(helpersArea.validarNombreUnico),
    validarcampos
], httpArea_tematica.putAreaTematica);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpArea_tematica.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpArea_tematica.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpArea_tematica.deleteAreaTematica);

export default router;