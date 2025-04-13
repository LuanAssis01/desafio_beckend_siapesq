import express from "express"
import tagController from "../controllers/tagController.js"

const routes = express.Router()

//Rotas Tag
routes.post("/tags", tagController.createTag)
routes.get("/tags", tagController.getTag)
routes.put("/tags:id", tagController.putTag)
routes.delete("/tags:id", tagController.deleteTag)

export default routes;