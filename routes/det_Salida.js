import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpDtSalida from "../controllers/det_Salida.js";

const router = Router();

router.get("/ver", httpDtSalida.getDsalida);

router.get("/detSalida/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpDtSalida.getDsalidaId);

router.post("/agregar",[
    check("cantidad_Entrega","La cantidad de entrega es obligatoria").not().isEmpty(),
    check("idSalida", "La salida es obligatoria").not().isEmpty(),
    check("idProducto", "El producto es obligatorio").not().isEmpty(),
    check("cantidad_pendiente", "La cantidad pendiente es obligatoria").not().isEmpty(),
    validarcampos
], httpDtSalida.postDsalida);

router.put("/modificar/:id",[
    check("cantidad_Entrega","La cantidad de entrega es obligatoria").not().isEmpty(),
    check("idSalida", "La salida es obligatoria").not().isEmpty(),
    check("idProducto", "El producto es obligatorio").not().isEmpty(),
    check("cantidad_pendiente", "La cantidad pendiente es obligatoria").not().isEmpty(),
    validarcampos
], httpDtSalida.putDsalida);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDtSalida.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDtSalida.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpDtSalida.deleteDsalida);

export default router;