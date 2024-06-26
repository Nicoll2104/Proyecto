import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDistareadestino from "../controllers/dist_area_destino.js";

const router = Router();

router.get("/ver", httpDistareadestino.getDisArDs);

router.get("/disAreaDes/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDistareadestino.getDisArDsid);

router.post("/agregar",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("año", 'El año es obligatorio').not().isEmpty(),
    check("idDistribucionRedArea", "La distribucion red area es obligatoria").not().isEmpty(),
    check("idDestino", "El destino es obligatorio").not().isEmpty(),
    validarcampos
], httpDistareadestino.postDisArDs);

router.put("/modificar/:id",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("año", 'El año es obligatorio').not().isEmpty(),
    check("idDistribucionRedArea", "La distribucion red area es obligatoria").not().isEmpty(),
    check("idDestino", "El destino es obligatorio").not().isEmpty(),
    validarcampos
], httpDistareadestino.putDisArDs);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistareadestino.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistareadestino.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistareadestino.deleteDisArDs);

export default router;