// api/src/routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';
import { authMiddleware } from '../auth/jwt.js';

const router = express.Router();

// aplica JWT a todas as rotas abaixo
router.use(authMiddleware);

router.get('/',    userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
