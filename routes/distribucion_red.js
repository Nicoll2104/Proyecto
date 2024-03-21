import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDisRed from "../controllers/distribucion_red.js";

const router = Router();

router.get("/ver", httpDisRed.getDistriRed);

router.get("/disRed/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDisRed.getDistriRedid);

router.post("/agregar",[
    check("codigo_auxiliar","El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor del presupuesto es obligatorio").not().isEmpty(),
    check('id_distribucion_dependencia', 'La distribucion de dependencia es obligatorio').not().isEmpty(),
    check("id_red_conocimiento", "La red conocimiento  es obligatorio").not().isEmpty(),
    check("id_tipo_producto", "El tipo de producto  es obligatorio").not().isEmpty(),
    validarcampos
], httpDisRed.postDistriRed);

router.put("/modificar/:id",[
    check("codigo_auxiliar","El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor del presupuesto es obligatorio").not().isEmpty(),
    check('id_distribucion_dependencia', 'La distribucion de dependencia es obligatorio').not().isEmpty(),
    check("id_red_conocimiento", "La red conocimiento  es obligatorio").not().isEmpty(),
    check("id_tipo_producto", "El tipo de producto  es obligatorio").not().isEmpty(),
    validarcampos
], httpDisRed.putDistriRed);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisRed.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisRed.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisRed.deleteDistriRed);

export default router;