import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDisRedArea from "../controllers/dis_red_area.js";

const router = Router();

router.get("/ver", httpDisRedArea.getDisRedA);

router.get("/disRedArea/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDisRedArea.getDisRedAId);

router.post("/agregar",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("ano", 'El año es obligatorio').not().isEmpty(),
    check("disRed", "La distribucion dependecia red es obligatoria").not().isEmpty(),
    check("area", "El area tematica es obligatoria").not().isEmpty(),
    validarcampos
],httpDisRedArea.postDisRedA);

router.put("/modificar/:id",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("ano", 'El año es obligatorio').not().isEmpty(),
    check("disRed", "La distribucion dependecia red es obligatoria").not().isEmpty(),
    check("area", "El area tematica es obligatoria").not().isEmpty(),
    validarcampos
],httpDisRedArea.putDisRedA);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisRedArea.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisRedArea.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisRedArea.deleteDisRedA);

export default router;
