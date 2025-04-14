// api/src/router/index.js
import express from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import itemRoutes from './itemRoutes.js';
import tagRoutes from './tagRoutes.js';
import itemUserRoutes from './itemUserRoutes.js';
import itemTagRoutes from './itemTagRoutes.js';

const router = express.Router();

// rotas públicas
router.use(authRoutes);

// rotas protegidas
router.use('/users', userRoutes);
router.use('/itens', itemRoutes);
router.use('/tags', tagRoutes);
router.use('/item-user', itemUserRoutes);
router.use('/item-tag', itemTagRoutes);

export default router;
