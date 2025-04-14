// api/src/routes/itemUserRoutes.js
import express from 'express';
import itemUserController from '../controllers/itemUserController.js';
import { authMiddleware } from '../auth/jwt.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', itemUserController.createAssociation);
router.get('/user/:user_id/items', itemUserController.getUserItems);
router.put('/:id', itemUserController.updateAssociation);
router.delete('/:id', itemUserController.deleteAssociation);

export default router;
