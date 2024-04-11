import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDisLoteDepen from "../controllers/dist_lote_depen.js";

const router = Router();

router.get("/ver", httpDisLoteDepen.getDisLoteD);

router.get("/disLoteDep/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDisLoteDepen.getDisLoteDId);

router.post("/agregar",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("disContratoLote", "La distribucion contrato lote es obligatoria").not().isEmpty(),
    check("disdepen", "La distribucion dependecia es obligatoria").not().isEmpty(),
    validarcampos
],httpDisLoteDepen.postDisLoteD);

router.put("/modificar/:id",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("disContratoLote", "La distribucion contrato lote es obligatoria").not().isEmpty(),
    check("disdepen", "La distribucion dependecia es obligatoria").not().isEmpty(),
    validarcampos
],httpDisLoteDepen.putDisLoteD);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisLoteDepen.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisLoteDepen.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisLoteDepen.deleteDisLoteD);

export default router;