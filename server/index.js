const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	//the connected MySQL database here will need to be replaced
	user: "root",
	host: "localhost",
	password: "Henry111",
	database: "ertdatabase",
});

app.post("/create", (req, res) => {
	const FTANumber = req.body.FTANumber;
	const FTARevision = req.body.FTARevision;
	const testFixture = req.body.testFixture;
	const reference = req.body.reference;
	const partNumber = req.body.partNumber;
	const partRevision = req.body.partRevision;
	const APNNumber = req.body.APNNumber;
	const partDescription = req.body.partDescription;

	db.query(
		"INSERT INTO data (FTANumber, FTARevision, testFixture, reference, partNumber, partRevision, APNNumber, partDescription) VALUES (?,?,?,?,?,?,?,?)",
		[
			FTANumber,
			FTARevision,
			testFixture,
			reference,
			partNumber,
			partRevision,
			APNNumber,
			partDescription,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values inserted.");
			}
		}
	);
});

app.get("/data", (req, res) => {
	db.query("SELECT * FROM data", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM data WHERE id= ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.listen(3002, () => {
	console.log("Your server is running on port 3002.");
});
