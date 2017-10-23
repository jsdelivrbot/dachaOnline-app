const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const powerSchema = new Schema({
	time: Date,
	u1Avg: Number,
	u2Avg: Number,
	u3Avg: Number,
	u1Min: Number,
	u2Min: Number,
	u3Min: Number,
	u1Max: Number,
	u2Max: Number,
	u3Max: Number
});

const Power = mongoose.model("power", powerSchema);

// DB setup
mongoose.connect("mongodb://dacha:dacha@ds127375.mlab.com:27375/dacha-online", {
	useMongoClient: true
});

app.get("/power", (req, res) => {
	const pass = req.query.pass;
	const reqTime = new Date() + 3;
	[
		DS,
		u1Avg,
		u2Avg,
		u3Avg,
		u1Min,
		u2Min,
		u3Min,
		u1Max,
		u2Max,
		u3Max
	] = req.query.val.split(";");

	if (pass !== "44009321") {
		res.sendStatus(403);
	}
	if (DS !== "DS") {
		res.sendStatus(403);
	}

	const powerData = new Power({
		time: reqTime,
		u1Avg,
		u2Avg,
		u3Avg,
		u1Min,
		u2Min,
		u3Min,
		u1Max,
		u2Max,
		u3Max
	});
	powerData.save(err => (err ? res.sendStatus(500) : res.sendStatus(200)));
});

const PORT = process.env.PORT || 3030;
app.listen(PORT);
console.log("Server started on port: ", PORT);
