import express from "express"
import itemUserController from "../controllers/itemUserController.js"

const routes = express.Router()

// Rotas para ItemUser
routes.post('/item-user', itemUserController.createAssociation);
routes.get('/user/:user_id/items', itemUserController.getUserItems);
routes.put('/item-user/:id', itemUserController.updateAssociation);
routes.delete('/item-user/:id', itemUserController.deleteAssociation);

export default routes;