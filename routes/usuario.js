import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validarcampos.js";
import httpUsuario from "../controllers/usuario.js";

const router = Router();

router.get("/ver", httpUsuario.getUsuario);

router.get("/usuario/:id", httpUsuario.getUsuarioid);

router.post("/agregar", httpUsuario.postUsuario);

router.post("/login", httpUsuario.login)

router.put("/modificar/:id", httpUsuario.putUsuario);

router.put("/inactivar/:id", httpUsuario.putInactivar);

router.put("activar/:id", httpUsuario.putActivar);

router.delete("/eliminar/:id", httpUsuario.deleteUsuario)

export default router;