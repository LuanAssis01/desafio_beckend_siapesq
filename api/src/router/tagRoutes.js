// api/src/routes/tagRoutes.js
import express from 'express';
import tagController from '../controllers/tagController.js';
import { authMiddleware } from '../auth/jwt.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', tagController.createTag);
router.get('/', tagController.getTag);
router.put('/:id', tagController.putTag);
router.delete('/:id', tagController.deleteTag);

export default router;
