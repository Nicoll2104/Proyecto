import { Router } from "express";
import { check } from "express-validator";
import httpItemPresupuesto from "../controllers/items_presupuesto.js";

const router = Router();

router.get("/ver", httpItemPresupuesto.getPresupuesto);

router.get("/presupuesto/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),

], httpItemPresupuesto.getPresupuestoId);

router.post("/agregar",[
    check("codigo_presupuestal", "El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("presupuesto_inicial","El presupuesto inicial es obligatorio").not().isEmpty(),
    check("vigencia", "La vigencia es obligatoria").not().isEmpty(),
], httpItemPresupuesto.postPresupuesto);

router.put("/modificar/:id",[
    check("codigo_presupuestal", "El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("presupuesto_inicial","El presupuesto inicial es obligatorio").not().isEmpty(),
    check("vigencia", "La vigencia es obligatoria").not().isEmpty(),
],httpItemPresupuesto.putPresupuesto);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
], httpItemPresupuesto.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
], httpItemPresupuesto.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
], httpItemPresupuesto.deletePresupuesto)

export default router;