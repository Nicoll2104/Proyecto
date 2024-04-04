import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDependencia from "../controllers/dependencia.js";

const router = Router();

router.get("/ver", httpDependencia.getDependencia);

router.get("/dependencia/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDependencia.getDependenciaid);

router.post("/agregar",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarcampos
], httpDependencia.postDependencia);

router.put("/modificar/:id",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarcampos
], httpDependencia.putDependencia);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDependencia.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDependencia.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDependencia.deleteDependencia);

export default router;