const express = require("express")
// const { setDefaultResultOrder } = require("dns/promises")

let PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use(require("./routes/apiRoutes"))
app.use(require("./routes/htmlRoutes"))



app.listen(PORT, () => console.log("EXPRESS SERVER LISTENING AT localhost:", PORT))

