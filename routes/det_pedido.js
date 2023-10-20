import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDetPedido from "../controllers/det_pedido.js";

const router = Router();

router.get("/ver", httpDetPedido.getDetPedido);

router.get("/detPedido/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDetPedido.getDetPedidoId);

router.post("/agregar",[
    check("cantidad","La cantidad es obligatoria").not().isEmpty(),
    check("pedido_id", "El id del pedido es obligatorio").not().isEmpty(),
    check("producto_id", "El id de la ficha es obligatorio").not().isEmpty(),
    validarcampos
], httpDetPedido.postDetPedido);

router.put("/modificar/:id",[
    check("cantidad","La cantidad es obligatoria").not().isEmpty(),
    check("pedido_id", "El id del pedido es obligatorio").not().isEmpty(),
    check("producto_id", "El id de la ficha es obligatorio").not().isEmpty(),
    validarcampos
],httpDetPedido.putDetPedido);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDetPedido.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDetPedido.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDetPedido.deleteDetPedido)

export default router;