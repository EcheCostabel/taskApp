import { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', authRequired, profile); //Cuando quiero proteger una ruta le paso un middleware 

export default router;