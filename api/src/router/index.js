import express from "express";
import userController from "../controllers/userController.js";
import itemController from "../controllers/itemController.js";
import tagController from "../controllers/tagController.js";
import itemUserController from "../controllers/itemUserController.js";
import itemTagController from "../controllers/itemTagController.js";
import { authMiddleware } from "../auth/jwt.js";

const router = express.Router();

router.post("/users", userController.createUser);
router.post("/login", userController.login);

router.use(authMiddleware);

router.get("/users", userController.getUser);
router.put("/users/:id", userController.putUser);
router.delete("/users/:id", userController.deleteUser);

router.post("/itens", itemController.createItem);
router.get("/itens", itemController.getItem);
router.put("/itens/:id", itemController.putItem);
router.delete("/itens/:id", itemController.deleteItem);

router.post("/tags", tagController.createTag);
router.get("/tags", tagController.getTag);
router.put("/tags/:id", tagController.putTag); 
router.delete("/tags/:id", tagController.deleteTag); 

router.post('/item-user', itemUserController.createAssociation);
router.get('/user/:user_id/items', itemUserController.getUserItems);
router.put('/item-user/:id', itemUserController.updateAssociation);
router.delete('/item-user/:id', itemUserController.deleteAssociation);

router.post('/item-tag', itemTagController.addTagToItem);
router.get('/item/:item_id/tags', itemTagController.getItemTags);
router.get('/tag/:tag_id/items', itemTagController.getItemsByTag);
router.delete('/item-tag/:id', itemTagController.removeTagFromItem);

export default router;