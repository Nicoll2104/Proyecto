import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDisDependencias from "../controllers/dis_dependencias.js";

const router = Router();

router.get("/ver", httpDisDependencias.getDis_dependencias);

router.get("/disDependencia/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDisDependencias.getDis_dependenciasId);

router.post("/agregar",[
    check("codigo_auxiliar", "El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor del presupuesto es obligatorio").not().isEmpty(),
    check("id_item_presupuesto","El presupuesto es obligatoria").not().isEmpty(),
    check("id_dependencias", "La dependencia es obligatoria").not().isEmpty(),
    validarcampos
], httpDisDependencias.postDis_dependencias);

router.put("/modificar/:id",[
    check("codigo_auxiliar", "El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor del presupuesto es obligatorio").not().isEmpty(),
    check("id_item_presupuesto","El presupuesto es obligatoria").not().isEmpty(),
    check("id_dependencias", "La dependencia es obligatoria").not().isEmpty(),
    validarcampos
],httpDisDependencias.putDis_dependencias);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisDependencias.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisDependencias.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDisDependencias.deleteDis_dependencias)

export default router;