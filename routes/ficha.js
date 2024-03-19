import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpFicha from "../controllers/ficha.js";
import helpersFicha from "../helpers/hp_ficha.js";

const router = Router();

router.get("/ver", httpFicha.getFicha);

router.get("/ficha/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpFicha.getFichaid);

router.post("/agregar",[
    check("codigo_ficha","El codigo ficha es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nivel_de_formacion", 'El nivel de formacion').not().isEmpty(),
    check("fecha_inicio", "La fecha inicio es obligatoria").not().isEmpty(),
    check("fecha_fin", "La fecha fin es obligatoria").not().isEmpty(),
    check("area_tematica","El  area es obligatorio").not().isEmpty(),
    check("codigo_ficha").custom(helpersFicha.validarCodigo),
    validarcampos
], httpFicha.postFicha);

router.put("/modificar/:id",[
    check("codigo_ficha","El codigo ficha es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nivel_de_formacion", 'El nivel de formacion').not().isEmpty(),
    check("fecha_inicio", "La fecha inicio es obligatoria").not().isEmpty(),
    check("fecha_fin", "La fecha fin es obligatoria").not().isEmpty(),
    check("area_tematica","El  area es obligatorio").not().isEmpty(),
    check("codigo_ficha").custom(helpersFicha.validarCodigo),
    validarcampos
],httpFicha.putFicha);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpFicha.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpFicha.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpFicha.deleteFicha)

export default router;