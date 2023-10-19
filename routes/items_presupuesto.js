import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpItem from "../controllers/items_presupuesto.js";

const router = Router();

router.get("/ver", httpItem.getItem);

router.get("/item/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpItem.getItemid);

router.post("/agregar",[
    check("codigo_presupuesto","El codigo_presupuesto es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto_inicial es obligatorio').not().isEmpty(),
    check("año", "El año  es obligatorio").not().isEmpty(),
    validarcampos
], httpItem.postItem);

router.put("/modificar/:id",[
    check("codigo_presupuesto","El codigo_presupuesto es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check('presupuesto_inicial', 'El presupuesto_inicial es obligatorio').not().isEmpty(),
    check("año", "El año  es obligatorio").not().isEmpty(),
    validarcampos
], httpItem.putItem);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpItem.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpItem.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpItem.deleteItem);

export default router;