const mongoose = require("mongoose")
const { model, Schema } = mongoose

const connectionString = process.env.MONGO_DB_URI

// Conexion a mongodb
mongoose
	.connect(connectionString, {})
	.then(() => {
		console.log("Conexion a mongodb exitosa")
	})
	.catch((err) => {
		console.log("Error en la conexion a mongodb")
	})

// Note.find({}).then((notes) => {
// 	console.log(notes)
// 	mongoose.connection.close()
// })

// const note = new Note({
// 	content: "Este es el contenido de la nota",
// 	date: new Date(),
// 	important: true,
// })

// note
// 	.save()
// 	.then((result) => {
// 		console.log("Nota guardada ", result)
// 		mongoose.connection.close()
// 	})
// 	.catch((err) => {
// 		console.log("Error al guardar la nota ", err)
// 	})
