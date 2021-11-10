require("dotenv").config()
require("./mongo")

const express = require("express")
const app = express()
const cors = require("cors")
const Note = require("./models/Note")
const { response } = require("express")
const handleErrors = require("./middleware/handleErrors")
const notFound = require("./middleware/notFound")

app.use(cors())
app.use(express.json())
app.use("/images", express.static("images"))

let notes = []

app.get("/", (req, res) => {
	res.send("<h1>Hello World</h1")
})

app.get("/api/notes", (req, res) => {
	Note.find({}).then((notes) => {
		res.json(notes)
	})
})

app.get("/api/notes/:id", (req, res) => {
	const id = req.params.id

	Note.findById(id)
		.then((note) => {
			if (note) {
				return res.json(note)
			} else {
				res.status(404).end()
			}
		})
		.catch((error) => {
			next(error)
		})
})

app.put("/api/note/:id", (res, req, next) => {
	const { id } = req.params
	const note = req.body

	const newNoteInfo = {
		content: note.content,
		important: note.important,
	}

	Note.findByIdAndUpdate(id, newNoteInfo).then((result) => {
		res.json(result)
	})
})

app.delete("/api/notes/:id", (req, res) => {
	const { id } = req.params.id

	Note.findByIdAndDelete(id)
		.then((res) => {
			res.status(204).end()
		})
		.catch((error) => {
			next(error)
		})
})

app.post("/api/notes", (req, res, next) => {
	const note = req.body

	if (!note || !note.content) {
		return res.status(400).json({
			error: "note.content is missing",
		})
	}

	const newNote = new Note({
		content: note.content,
		important: note.important || false,
		date: new Date(),
	})

	newNote.save().then((savedNote) => {
		response.json(savedNote)
	})
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server running on port ${PORT}`))
