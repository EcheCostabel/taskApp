import { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post('/register',validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema), login);
router.post('/logout', logout);

router.get('/profile', authRequired, profile); //Cuando quiero proteger una ruta le paso un middleware 

export default router;