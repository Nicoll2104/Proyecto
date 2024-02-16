import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpPedido from "../controllers/pedido.js";

const router = Router();

router.get("/ver", httpPedido.getPedido);

router.get("/pedido/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpPedido.getPedidoId);

router.post("/agregar",[
    check("fecha_creacion","La fecha de creacion es obligatoria").not().isEmpty(),
    check("fecha_entrega", "La fecha de entrega es obligatoria").not().isEmpty(),
    check("instructor_encargado", "El instructor encargado es obligatorio").not().isEmpty(),
    check("ficha", "La ficha es obligatoria").not().isEmpty(),
    check('rol_usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarcampos
], httpPedido.postPedido);

router.put("/modificar/:id",[
    check("fecha_creacion","La fecha de creacion es obligatoria").not().isEmpty(),
    check("fecha_entrega", "La fecha de entrega es obligatoria").not().isEmpty(),
    check("instructor_encargado", "El instructor encargado es obligatorio").not().isEmpty(),
    check("ficha", "La ficha es obligatoria").not().isEmpty(),
    check('rol_usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarcampos
],httpPedido.putPedido);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpPedido.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpPedido.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpPedido.deletePedido)

export default router;