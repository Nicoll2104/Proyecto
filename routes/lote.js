import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpLote from "../controllers/lote.js";
import helpersLote from "../helpers/hp_lote.js";

const router = Router();

router.get("/ver", httpLote.getLote);

router.get("/depen/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpLote.getLoteid);

router.post("/agregar",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("año", "El año es obligatorio").not().isEmpty(),
    check("codigo").custom(helpersLote.validarCodigo),
    validarcampos
], httpLote.postLote);

router.put("/modificar/:id",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("año", "El año es obligatorio").not().isEmpty(),
    check("codigo").custom(helpersLote.validarCodigo),
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