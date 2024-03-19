import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDistribucionArea from "../controllers/distribucion_area.js";

const router = Router();

router.get("/ver", httpDistribucionArea.getDistarea);

router.get("/DisgetDistarea/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDistribucionArea.getDistareaid);

router.post("/agregar",[
    check("codigo_auxiliar","El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor presupuesto es obligatorio").not().isEmpty(),
    check("distribucion_red", 'La distribucion de red es obligatoria').not().isEmpty(),
    check("area_tematica", "El area tematica es obligatoria").not().isEmpty(),
    validarcampos
], httpDistribucionArea.postDistarea);

router.put("/modificar/:id",[
    check("codigo_auxiliar","El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor presupuesto es obligatorio").not().isEmpty(),
    check("distribucion_red", 'La distribucion de red es obligatoria').not().isEmpty(),
    check("area_tematica", "El area tematica es obligatoria").not().isEmpty(),
    validarcampos
], httpDistribucionArea.putDistarea);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionArea.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionArea.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionArea.deleteDistarea);

export default router;