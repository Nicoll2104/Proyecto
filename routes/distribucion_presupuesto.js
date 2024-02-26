import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDistribucionPresupesto from "../controllers/distribucion_presupuesto.js";

const router = Router();

router.get("/ver", httpDistribucionPresupesto.getDisPresupuesto);

router.get("/disPresupues/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDistribucionPresupesto.getDisPresupuestoId);

router.post("/agregar",[
    check("codigo_presupuestal","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto inicial es obligatorio').not().isEmpty(),
    check("ano", "El año es obligatorio").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    check("items","Los items son obligatorios").not().isEmpty(),
    validarcampos
], httpDistribucionPresupesto.postDisPresupuesto);

router.put("/modificar/:id",[
    check("codigo_presupuestal","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto inicial es obligatorio').not().isEmpty(),
    check("ano", "El año es obligatorio").not().isEmpty(),
    check("lote", "El lote es obligatorio").not().isEmpty(),
    check("items","Los items son obligatorios").not().isEmpty(),
    validarcampos
],httpDistribucionPresupesto.putDisPresupuesto);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionPresupesto.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionPresupesto.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionPresupesto.deleteDisPresupuesto)

export default router;