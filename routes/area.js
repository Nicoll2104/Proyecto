import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpArea from "../controllers/area.js";

const router = Router();

router.get("/ver", httpArea.getArea);

router.get("/area/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpArea.getAreaId);

router.post("/agregar",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("presupuesto", "El presupuesto es obligatorio").not().isEmpty(),
    check('ficha_id', "El id de la ficha es obligatorio").isEmail().notEmpty(),
    validarcampos
], httpArea.postArea);

router.put("/modificar/:id",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("presupuesto", "El presupuesto es obligatorio").not().isEmpty(),
    check('ficha_id', "El id de la ficha es obligatorio").isEmail().notEmpty(),
    validarcampos
],httpArea.putArea);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpArea.putInactivar);

router.put("activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpArea.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpArea.deleteArea)

export default router;