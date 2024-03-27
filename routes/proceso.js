import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpProceso from "../controllers/proceso.js";

const router = Router();

router.get("/ver", httpProceso.getProceso);

router.get("/proceso/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpProceso.getProcesoId);

router.post("/agregar",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarcampos
], httpProceso.postProceso);

router.put("/modificar/:id",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarcampos
], httpProceso.putProceso);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProceso.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProceso.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProceso.deleteProceso);

export default router;