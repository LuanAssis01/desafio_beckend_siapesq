import express from "express"
import userController from "../controllers/userController.js"

const routes = express.Router()

//Rotas User
routes.post("/users", userController.createUser)
routes.get("/users", userController.getUser)
routes.put("/users:id", userController.putUser)
routes.delete("/users:id", userController.deleteUser)
routes.post('/login', userController.login);

export default routes;
