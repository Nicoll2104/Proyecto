import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDependencia from "../controllers/dependecia.js";

const router = Router();

router.get("/ver", httpDependencia.getdepe);

router.get("/depen/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDependencia.getdepeid);

router.post("/agregar",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("año", "El año es obligatorio").not().isEmpty(),
    validarcampos
], httpDependencia.postdepe);

router.put("/modificar/:id",[
    check("codigo","El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("año", "El año es obligatorio").not().isEmpty(),
    validarcampos
],httpDependencia.putdepe);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDependencia.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDependencia.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDependencia.deletedepe)

export default router;