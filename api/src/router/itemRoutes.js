// api/src/routes/itemRoutes.js
import express from 'express';
import itemController from '../controllers/itemController.js';
import { authMiddleware } from '../auth/jwt.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', itemController.createItem);
router.get('/', itemController.getItem);
router.put('/:id', itemController.putItem);
router.delete('/:id', itemController.deleteItem);

export default router;
