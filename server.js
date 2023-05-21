const express = require("express")
const path = require("path")
const fs = require("fs/promises")
const db = require("./db/db.json")
const { randomUUID } = require("crypto")
const { parse } = require("path")

let PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())


app.get("/api/notes", async (req, res) => {
    console.log(req.headers)
    const notes = await fs.readFile(path.join(__dirname, "db/db.json"), { encoding: "utf8"})
    const result = JSON.parse(notes)
    // .then((result) => {
    //     console.log(result)
    //     return result ?? null
    // })
    console.log("READ FILE", {notes})
    console.log({db})
    if (!result) {
        res.status(400).send("COULD NOT GET NOTES")
        return
    }

    res.status(200).json({result})
})

app.post("/api/notes", async (req, res) => {
    console.log(req.body)
    if (!req.body.title || !req.body.text) {
        res.status(400).send("MISSING TITLE OR TEXT IN REQ BODY")
        return
    }

    const newNote = {
        ...req.body, 
        id: randomUUID()
    }

    const notes = await fs.readFile(path.join(__dirname, "db/db.json"), { encoding: "utf8"})
    const parsedNotes = JSON.parse(notes)
    if (!parsedNotes || !notes) {
        res.status(400).send("jasbdkfbsbdk")
        return
    }

    console.log(parsedNotes, typeof parsedNotes)
})









app.listen(PORT, () => console.log("EXPRESS SERVER LISTENING AT localhost:", PORT))

