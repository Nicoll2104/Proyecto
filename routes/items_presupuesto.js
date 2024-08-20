import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpItemPresupuesto from "../controllers/items_presupuesto.js";

const router = Router();

router.get("/ver", httpItemPresupuesto.getPresupuesto);

router.get("/presupuesto/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpItemPresupuesto.getPresupuestoId);

router.post("/agregar",[
    check("codigo_presupuestal", "El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("presupuesto_inicial","El presupuesto inicial es obligatorio").not().isEmpty(),
    check("vigencia", "La vigencia es obligatoria").not().isEmpty(),
    validarcampos
], httpItemPresupuesto.postPresupuesto);

router.put("/modificar/:id",[
    check("codigo_presupuestal", "El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("presupuesto_inicial","El presupuesto inicial es obligatorio").not().isEmpty(),
    check("vigencia", "La vigencia es obligatoria").not().isEmpty(),
    validarcampos
],httpItemPresupuesto.putPresupuesto);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpItemPresupuesto.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpItemPresupuesto.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpItemPresupuesto.deletePresupuesto)

export default router;