import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpProvedor from "../controllers/provedor.js";

const router = Router();

router.get("/ver", httpProvedor.getProvedor);

router.get("/provedor/:id",httpProvedor.getProvedorId);

router.post("/agregar",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("dni", "El dni es obligatorio").not().isEmpty(),
    check('correo', 'El correo tiene que llevar @ y es obligatorio').isEmail().notEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }),
    validarcampos 
],httpProvedor.postProvedor);

router.put("/modificar/:id",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("dni", "El dni es obligatorio").not().isEmpty(),
    check('correo', 'El correo tiene que llevar @ y es obligatorio').isEmail().notEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }),
    validarcampos 
],httpProvedor.putProvedor);

router.put("/inactivar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProvedor.putInactivar);

router.put("/activar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProvedor.putactivar);

router.delete("/eliminar/:id",[
    check("id", "Digite ID").not().isEmpty(),
    validarcampos
], httpProvedor.deleteProvedor);

export default router;