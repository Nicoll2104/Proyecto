import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpContrato from "../controllers/contrato.js";

const router = Router();

router.get("/ver", httpContrato.getcontrato);

router.get("/contrato/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpContrato.getcontratoid);

router.post("/agregar",[
    check("codigo","La fecha es obligatoria").not().isEmpty(),
    check("nombre", "La distribucion ficha es obligatorio").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuestoActual", "El presupuesto actual es obligatorio").not().isEmpty(),
    validarcampos
], httpContrato.postcontrato);

router.put("/modificar/:id",[
    check("codigo","La fecha es obligatoria").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuestoActual", "El presupuesto actual es obligatorio").not().isEmpty(),
    validarcampos
], httpContrato.putcontrato);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpContrato.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpContrato.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpContrato.deletecontrato);

export default router;