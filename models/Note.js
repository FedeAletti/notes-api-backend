const { Schema, model } = require("mongoose")

// Esquema de la nota:
const noteSchema = new Schema({
	content: String,
	date: Date,
	important: Boolean,
})

noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

// Modelo de la nota
const Note = model("Note", noteSchema)

module.exports = Note
