import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httptipoproducto from "../controllers/tipo_producto.js";

const router = Router();

router.get("/ver", httptipoproducto.getTipoproducto);

router.get("/item/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httptipoproducto.getTipoproductoId);

router.post("/agregar",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarcampos
], httptipoproducto.postTipoproducto);

router.put("/modificar/:id",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarcampos
], httptipoproducto.putTipoproducto);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httptipoproducto.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httptipoproducto.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httptipoproducto.deleteTipoproducto);

export default router;