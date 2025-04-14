// api/src/routes/itemTagRoutes.js
import express from 'express';
import itemTagController from '../controllers/itemTagController.js';
import { authMiddleware } from '../auth/jwt.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', itemTagController.addTagToItem);
router.get('/item/:item_id/tags', itemTagController.getItemTags);
router.get('/tag/:tag_id/items', itemTagController.getItemsByTag);
router.delete('/:id', itemTagController.removeTagFromItem);

export default router;
