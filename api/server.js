import express from "express"
import routes from "./src/router/urls.js"

import "dotenv/config"

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(routes)

app.listen(port, (error) => {
    if(error){
        console.error("Deu merda!")
        return
    }
    console.log("Deu bom!")
})