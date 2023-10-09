import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpLote from "../controllers/lote.js";

const router = Router();

router.get("/ver", httpLote.getLote);

router.get("/lote/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpLote.getLotesid);

router.post("/agregar",[
    check("codigo_presupuestal","El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto inicial es obligatorio').not().isEmpty(),
    check("año", "El año es obligatorio").not().isEmpty(),
    check("modificaciones", "Las modificaciones son obligatorias").not().isEmpty(),
    check("presupuesto_definitivo","El presupuesto definitivo es obligatorio").not().isEmpty(),
    validarcampos
], httpLote.postLotes);

router.put("/modificar/:id",[
    check("codigo_presupuestal","El codigo presupuestal es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto inicial es obligatorio').not().isEmpty(),
    check("año", "El año es obligatorio").not().isEmpty(),
    check("modificaciones", "Las modificaciones son obligatorias").not().isEmpty(),
    check("presupuesto_definitivo","El presupuesto definitivo es obligatorio").not().isEmpty(),
    validarcampos
],httpLote.putLote);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpLote.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpLote.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpLote.deleteLote)

export default router;