import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httprequerimiento from "../controllers/requerimiento.js";

const router = Router();

router.get("/ver", httprequerimiento.getRequerimiento);

router.get("/requerimiento/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httprequerimiento.getRequerimientoid);

router.post("/agregar",[
    check("fecha","La fecha es obligatoria").not().isEmpty(),
    check("id_distribucion_ficha", "La distribucion ficha es obligatorio").not().isEmpty(),
    check('id_usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarcampos
], httprequerimiento.postRequerimiento);

router.put("/modificar/:id",[
    check("fecha","La fecha es obligatoria").not().isEmpty(),
    check("id_distribucion_ficha", "La distribucion ficha es obligatorio").not().isEmpty(),
    check('id_usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarcampos
], httprequerimiento.putRequerimiento);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httprequerimiento.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httprequerimiento.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httprequerimiento.deleteRequerimiento);

export default router;