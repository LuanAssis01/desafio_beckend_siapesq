
import itemController from "../controllers/itemController.js"

const routes = express.Router()

// Rotas Item
routes.post("/itens", itemController.createItem)
routes.get("/itens", itemController.getItem)
routes.put("/itens:id", itemController.putItem)
routes.delete("/itens:id", itemController.deleteItem)

export default routes;