import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpSalida from "../controllers/salida.js";

const router = Router();

router.get("/ver", httpSalida.getsalida);

router.get("/salida/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpSalida.getsalidaId);

router.post("/agregar",[
    check("fecha_entrega", "La fecha de entrega es obligatoria").not().isEmpty(),
    check("entregado", "La verifcacion del entregado es obligatoria ").not().isEmpty(),
    check('idUsuario', 'El usuario es obligatorio').not().isEmpty(),
    check('idPedido', 'El pedido es obligatorio').not().isEmpty(),
    validarcampos
], httpSalida.postsalida);

router.put("/modificar/:id",[
    check("fecha_entrega", "La fecha de entrega es obligatoria").not().isEmpty(),
    check("entregado", "La verifcacion del entregado es obligatoria ").not().isEmpty(),
    check('idUsuario', 'El usuario es obligatorio').not().isEmpty(),
    check('idPedido', 'El pedido es obligatorio').not().isEmpty(),
    validarcampos
],httpSalida.putsalida);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpSalida.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpSalida.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpSalida.deletesalida)

export default router;