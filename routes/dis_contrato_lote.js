import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDistribucionFicha from "../controllers/distribucion_ficha.js";

const router = Router();

router.get("/ver", httpDistribucionFicha.getDisFicha);

router.get("/disFicha/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDistribucionFicha.getDisFichaId);

router.post("/agregar",[
    check("codigo_auxiliar", "El codigo es obligatorio").not().isEmpty(),
    check("presupuesto", "El presupuesto es obligatorio").not().isEmpty(),
    check('distribucion_presupuesto', 'La distribucion_presupuesto es obligatoria').not().isEmpty(),
    check("ficha", "La  ficha es obligatoria").not().isEmpty(),
    validarcampos
], httpDistribucionFicha.postDisFicha);

router.put("/modificar/:id",[
    check("codigo_auxiliar", "El codigo es obligatorio").not().isEmpty(),
    check("presupuesto", "El presupuesto es obligatorio").not().isEmpty(),
    check('distribucion_presupuesto', 'La distribucion_presupuesto es obligatoria').not().isEmpty(),
    check("ficha", "La  ficha es obligatoria").not().isEmpty(),
    validarcampos
],httpDistribucionFicha.putDisFicha);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionFicha.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionFicha.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionFicha.deleteDisFicha)

export default router;