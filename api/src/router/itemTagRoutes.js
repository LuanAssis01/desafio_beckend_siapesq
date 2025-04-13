import express from "express"
import itemTagController from "../controllers/itemTagController.js"

const routes = express.Router()

// Rotas para ItemTag
routes.post('/item-tag', itemTagController.addTagToItem);
routes.get('/item/:item_id/tags', itemTagController.getItemTags);
routes.get('/tag/:tag_id/items', itemTagController.getItemsByTag);
routes.delete('/item-tag/:id', itemTagController.removeTagFromItem);

export default routes;