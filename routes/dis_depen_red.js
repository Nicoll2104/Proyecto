import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDisDepenRed from "../controllers/dis_depen_red.js";

const router = Router();

router.get("/ver", httpDisDepenRed.getDisDepR);

router.get("/disDepRed/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDisDepenRed.getDisDepRId);

router.post("/agregar",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("ano", 'El año es obligatorio').not().isEmpty(),
    check("disdepen", "La distribucion dependecia es obligatoria").not().isEmpty(),
    check("redconoci", "La red de conocimiento es obligatoria").not().isEmpty(),
    validarcampos
],httpDisDepenRed.postDisDepR);

router.put("/modificar/:id",[
    check("presupuesto_asignado","El presupuesto asignado es obligatorio").not().isEmpty(),
    check("presupuesto_actual", "El presupuesto actual es obligatorio").not().isEmpty(),
    check("ano", 'El año es obligatorio').not().isEmpty(),
    check("disdepen", "La distribucion dependecia es obligatoria").not().isEmpty(),
    check("redconoci", "La red de conocimiento es obligatoria").not().isEmpty(),
    validarcampos
],httpDisDepenRed.putDisDepR);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisDepenRed.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisDepenRed.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisDepenRed.deleteDisDepR);

export default router;