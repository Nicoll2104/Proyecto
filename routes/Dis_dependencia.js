import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDistribucionDependencia from "../controllers/Dis_dependencia.js";

const router = Router();

router.get("/ver", httpDistribucionDependencia.getDisPresupuesto);

router.get("/disPresupues/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.getDisPresupuestoId);

router.post("/agregar",[
    check("codigo_presupuestal","El codigo es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto inicial es obligatorio').not().isEmpty(),
    check("ano", "El año es obligatorio").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    check("items","Los items son obligatorios").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.postDisPresupuesto);

router.put("/modificar/:id",[
    check("codigo_presupuestal","El codigo es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto inicial es obligatorio').not().isEmpty(),
    check("ano", "El año es obligatorio").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    check("items","Los items son obligatorios").not().isEmpty(),
    validarcampos
],httpDistribucionDependencia.putDisPresupuesto);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.deleteDisPresupuesto)

export default router;