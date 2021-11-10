module.exports = (error, req, res, next) => {
	console.error(error)
	console.log(error.name)
	if (error.name === "CastError") {
		return res.status(400).send({ error: "id used is malformed" })
	} else {
		res.status(500).end()
	}
}
