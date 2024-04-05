import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDestino from "../controllers/destino.js";

const router = Router();

router.get("/ver", httpDestino.getDestino);

router.get("/destino/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDestino.getDestinoid);

router.post("/agregar",[
    check("codigo","El codigo ficha es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nivel_de_formacion", 'El nivel de formacion').not().isEmpty(),
    check("fecha_inicio", "La fecha inicio es obligatoria").not().isEmpty(),
    check("fecha_fin", "La fecha fin es obligatoria").not().isEmpty(),
    validarcampos
], httpDestino.postDestino);

router.put("/modificar/:id",[
    check("codigo","El codigo ficha es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nivel_de_formacion", 'El nivel de formacion').not().isEmpty(),
    check("fecha_inicio", "La fecha inicio es obligatoria").not().isEmpty(),
    check("fecha_fin", "La fecha fin es obligatoria").not().isEmpty(),
    validarcampos
],httpDestino.putDestino);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDestino.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDestino.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDestino.deleteDestino)

export default router;