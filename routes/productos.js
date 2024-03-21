import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpProducto from "../controllers/producto.js";

const router = Router();

router.get("/ver", httpProducto.getProducto);

router.get("/producto/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpProducto.getProductoId);

router.post("/agregar",[
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion","La descripcion es obligatoria").not().isEmpty(),
    check("unidad_medida", "La unidad_medida es obligatoria").not().isEmpty(),
    check("precio_unitario", "El precio_unitario es obligatorio").not().isEmpty(),
    check("impestos"," Los impestos son obligatorios").not().isEmpty(),
    check("fecha_creacion", "La fecha_creacion es obligatoria").not().isEmpty(),
    check("fecha_vencimiento", "La fecha_vencimiento es obligatoria").not().isEmpty(),
    check("id_tipo_producto", "El tipo de producto es obligatoria").not().isEmpty(),
    validarcampos
], httpProducto.postProducto);

router.put("/modificar/:id",[
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion","La descripcion es obligatoria").not().isEmpty(),
    check("unidad_medida", "La unidad_medida es obligatoria").not().isEmpty(),
    check("precio_unitario", "El precio_unitario es obligatorio").not().isEmpty(),
    check("impestos"," Los impestos son obligatorios").not().isEmpty(),
    check("fecha_creacion", "La fecha_creacion es obligatoria").not().isEmpty(),
    check("fecha_vencimiento", "La fecha_vencimiento es obligatoria").not().isEmpty(),
    check("id_tipo_producto", "El tipo de producto es obligatoria").not().isEmpty(),
    validarcampos
],httpProducto.putProducto);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProducto.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProducto.putActivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProducto.deleteProducto)

export default router;