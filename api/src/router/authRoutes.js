// api/src/routes/authRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// criação de usuário (signup)
router.post('/users', userController.createUser);
// login
router.post('/login', userController.login);

export default router;
