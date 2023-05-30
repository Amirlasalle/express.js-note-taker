const fs = require("fs/promises")
const db = require("../db/db.json")
const { randomUUID } = require("crypto")
const app = require("express").Router()
const path = require("path")

app.get("/api/notes", async (req, res) => {
    console.log(req.headers)
    const notes = await fs.readFile("./db/db.json", { encoding: "utf8" })
    const result = JSON.parse(notes)
    // .then((result) => {
    //     console.log(result)
    //     return result ?? null
    // })
    console.log("READ FILE", { notes })
    console.log({ db })
    if (!result) {
        res.status(400).send("COULD NOT GET NOTES")
        return
    }

    res.status(200).json(result)
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

    const notes = await fs.readFile("./db/db.json", { encoding: "utf8" })
    const parsedNotes = JSON.parse(notes)
    parsedNotes.push(newNote)
    if (!parsedNotes || !notes) {
        res.status(400).send("jasbdkfbsbdk")

        setDefaultResultOrder
        return
    }
    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), function (err) {
        if (err) throw err;
    })

    console.log(parsedNotes, typeof parsedNotes)
    res.json(parsedNotes)
})


app.delete("/api/notes/:id", async (req, res) => {
    console.log(req.body)

    const notes = await fs.readFile("./db/db.json", { encoding: "utf8" })
    const parsedNotes = JSON.parse(notes)
    let newNotesList = []
    parsedNotes.forEach(element => {
        if (element.id != req.params.id) {
            newNotesList.push(element)
        }
    })
    fs.writeFile("./db/db.json", JSON.stringify(newNotesList), function (err) {
        if (err) throw err;
    })

    console.log(parsedNotes, typeof parsedNotes)
    res.json(newNotesList)
})
module.exports = app;
