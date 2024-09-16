import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpItemPresupuesto from "../controllers/items_presupuesto.js";
import helpersLote from "../helpers/hp_lote.js";

const router = Router();

router.get("/ver", httpItemPresupuesto.getItemPresupuesto);

router.get("/presupuesto/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpItemPresupuesto.getItemPresupuestoid);

router.post("/agregar",[
    check("codigo_presupuestal", "El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("presupuesto_inicial", "El presupuesto inicial es obligatorio").not().isEmpty(),
    check("vigencia", "La vigencia es obligatoria").not().isEmpty(),
    validarcampos
], httpItemPresupuesto.postItemPresupuesto);

router.put("/modificar/:id",[
    check("codigo_presupuestal", "El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("presupuesto_inicial", "El presupuesto inicial es obligatorio").not().isEmpty(),
    check("vigencia", "La vigencia es obligatoria").not().isEmpty(),
    validarcampos
],httpItemPresupuesto.putItemPresupuesto);

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
], httpItemPresupuesto.deleteItemPresupuesto)

export default router;