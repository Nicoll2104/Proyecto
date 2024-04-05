import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDistribucionDependencia from "../controllers/dis_dependencia.js";

const router = Router();

router.get("/ver", httpDistribucionDependencia.getDisDependencia);

router.get("/disPresupues/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.getDisDependenciaId);

router.post("/agregar",[
    check("codigo_presupuestal","El codigo es obligatorio").not().isEmpty(),
    check('presupuesto_asignado', 'El presupuesto asignado es obligatorio').not().isEmpty(),
    check("presupuesto_actual",'El presupuesto actual es obligatorio').not().isEmpty(),
    check("ano", "El año es obligatorio").not().isEmpty(),
    check("dependencia", "La dependencia es obligatoria").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.postDisDependencia);

router.put("/modificar/:id",[
    check("codigo_presupuestal","El codigo es obligatorio").not().isEmpty(),
    check('presupuesto_asignado', 'El presupuesto asignado es obligatorio').not().isEmpty(),
    check("presupuesto_actual",'El presupuesto actual es obligatorio').not().isEmpty(),
    check("ano", "El año es obligatorio").not().isEmpty(),
    check("dependencia", "La dependencia es obligatoria").not().isEmpty(),
    validarcampos
],httpDistribucionDependencia.putDisDependencia);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDistribucionDependencia.deleteDisDependencia)

export default router;