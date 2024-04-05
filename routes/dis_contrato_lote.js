import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDisContratoLote from "../controllers/dis_contrato_lote.js";

const router = Router();

router.get("/ver", httpDisContratoLote.getDisConL);

router.get("/disFicha/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDisContratoLote.getDisConLId);

router.post("/agregar",[
    check("codigo_auxiliar", "El codigo es obligatorio").not().isEmpty(),
    check("presupuesto_asignado", "El presupuesto asignado es obligatorio").not().isEmpty(),
    check('presupuesto_actual', 'El presupuesto actual es obligatorio').not().isEmpty(),
    check("contrato", "El contrato es obligatorio").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    validarcampos
], httpDisContratoLote.postDisConL);

router.put("/modificar/:id",[
    check("codigo_auxiliar", "El codigo es obligatorio").not().isEmpty(),
    check("presupuesto_asignado", "El presupuesto asignado es obligatorio").not().isEmpty(),
    check('presupuesto_actual', 'El presupuesto actual es obligatorio').not().isEmpty(),
    check("contrato", "El contrato es obligatorio").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    validarcampos
],httpDisContratoLote.putDisConL);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisContratoLote.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisContratoLote.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisContratoLote.deleteDisConL)

export default router;