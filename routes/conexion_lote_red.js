import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpConLoteRed from "../controllers/conexion_lote_red.js";
import helpersConexio_lote_red from "../helpers/hp_conexio_lote_red.js";

const router = Router();

router.get("/ver", httpConLoteRed.getConLoteRed);

router.get("/conLoteRed/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpConLoteRed.getConLoteRedid);

router.post("/agregar",[
    check("codigo_auxiliar","El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor del presupuesto es obligatorio").not().isEmpty(),
    check('id_distribucion_dependencia', 'La distribucion de dependencia es obligatorio').not().isEmpty(),
    check("id_red_conocimiento", "La red conocimiento  es obligatorio").not().isEmpty(),
    check("id_tipo_producto", "El tipo de producto  es obligatorio").not().isEmpty(),
    check('codigo_auxiliar').custom(helpersConexio_lote_red.validarCodigo),
    validarcampos
], httpConLoteRed.postConLoteRed);

router.put("/modificar/:id",[
    check("codigo_auxiliar","El codigo auxiliar es obligatorio").not().isEmpty(),
    check("valor_presupuesto", "El valor del presupuesto es obligatorio").not().isEmpty(),
    check('id_distribucion_dependencia', 'La distribucion de dependencia es obligatorio').not().isEmpty(),
    check("id_red_conocimiento", "La red conocimiento  es obligatorio").not().isEmpty(),
    check("id_tipo_producto", "El tipo de producto  es obligatorio").not().isEmpty(),
    check('codigo_auxiliar').custom(helpersConexio_lote_red.validarCodigo),
    validarcampos
], httpConLoteRed.putConLoteRed);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpConLoteRed.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpConLoteRed.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpConLoteRed.deleteConLoteRed);

export default router;