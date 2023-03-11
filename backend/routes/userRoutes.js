import express from "express";
const router = express.Router();
import {
    register,
    autenticate,
    confirm,
    resetPassword,
    checkToken,
    newPassword,
    perfil
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkout.js";

//autenticaciom, registo y confirmacion de usuarios
router.post('/', register); // Create new user
router.post('/login', autenticate); // Create new user
router.get('/confirm/:token', confirm)  //confirm by email
router.post('/reset-password', resetPassword); // route para restartPassword [send email]
// confirm email token and after post the new passtword
router.route('/reset-password/:token').get(checkToken).post(newPassword)

router.get('/perfil', checkAuth, perfil);

export default router;