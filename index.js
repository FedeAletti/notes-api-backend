const express = require("express")
const logger = require("./loggerMiddleware")
const cors = require("cors")
const app = express()


app.use(cors())   
app.use(express.json())
app.use(logger)

let notes = [
    {
        "id": 1,
        "content": "Esta es la primer nota de laa lista",
        "date": "2021-10-20",
        "important": true
    },
    {
        "id": 2,
        "content": "Esta es la segunda nota de la lista",
        "date": "2021-10-22",
        "important": true
    },
    {
        "id": 3,
        "content": "Esta es la tercera nota de la lista",
        "date": "2021-10-26",
        "important": false
    }
]


app.get("/", (req, res)=>{
    res.send("<h1>Hello World</h1")
})

app.get("/api/notes", (req, res)=>{
    res.json(notes)    
})

app.get("/api/notes/:id", (req, res)=>{
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
        res.json(note)
    }else{
        res.status(404).end()
    }
    
})

app.delete("/api/notes/:id", (req, res)=>{
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})


app.post("/api/notes", (req, res)=>{
    const note = req.body

    if( !note || !note.content) {
        return res.status(400).json({
            error: "note.content is missing"
        })
    }
    
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== "undefined" ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    res.status(201).json(newNote)
})

app.use((req, res)=>{
    res.status(404)
    .end()
})

const PORT = 3001
app.listen(PORT, (
    console.log(`Server running on port ${PORT}`)
))