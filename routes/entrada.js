import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpEntrada from "../controllers/entrada.js";

const router = Router();

router.get("/ver", httpEntrada.getEntrada);

router.get("/entrada/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpEntrada.getEntradaId);

router.post("/agregar",[
    check("cantidad","La cantidad es obligatoria").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("idProducto", "El producto es obligatorio").not().isEmpty(),
    validarcampos
], httpEntrada.postEntrada);

router.put("/modificar/:id",[
    check("cantidad","La cantidad es obligatoria").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("idProducto", "El producto es obligatorio").not().isEmpty(),
    validarcampos
], httpEntrada.putEntrada);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpEntrada.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpEntrada.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpEntrada.deleteEntrada);

export default router;