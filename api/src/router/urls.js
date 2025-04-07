import { Router } from "express"

const routes = Router()

routes.get("/admin/", (req, res) => {
    return res.status(200).json({message: "Server ON"})
})

export default routes