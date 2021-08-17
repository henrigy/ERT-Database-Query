const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//ESTABLISHES CONNECTION TO THE MYSQL DATABASE
//the password needs to be changed to reflect the MySQL password used to login
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "Henry111",
	database: "ertdatabase",
});

//CREATES THE DATA ENTRIES IN THE MYSQL DATABASE
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

//RETURNS THE DATA FROM THE MYSQL DATABASE ACCORDING TO ROW AND COLUMNS
app.get("/data", (req, res) => {
	db.query("SELECT * FROM data", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

//DELETES SELECTED DATA ENTRIES FROM THE MYSQL DATABASE
app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM data WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

//RETURNS THE DATA FROM THE MYSQL DATABASE ACCORDING TO ROW AND COLUMN FOR FTA NUMBERS MATCHING THE SEARCH OPERATOR
app.get("/search/:displaySearchOperator", (req, res) => {
	const displaySearchOperator = req.params.displaySearchOperator;
	db.query(
		"SELECT * FROM data WHERE FTANumber = ? ",
		displaySearchOperator,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

//UPDATES THE MYSQL DATABASE WITH ANY EDITS MADE TO A SELECTED DATA ENTRY
app.put("/update", (req, res) => {
	const id = req.body.id;
	const newFTANumber = req.body.newFTANumber;
	const newFTARevision = req.body.newFTARevision;
	const newTestFixture = req.body.newTestFixture;
	const newReference = req.body.newReference;
	const newPartNumber = req.body.newPartNumber;
	const newPartRevision = req.body.newPartRevision;
	const newAPNNumber = req.body.newAPNNumber;
	const newPartDescription = req.body.newPartDescription;

	db.query(
		"UPDATE data SET FTANumber = ?, FTARevision = ?, testFixture =?, reference =?, partNumber = ?, partRevision = ?, APNNumber = ?, partDescription = ? WHERE id = ?",
		[
			newFTANumber,
			newFTARevision,
			newTestFixture,
			newReference,
			newPartNumber,
			newPartRevision,
			newAPNNumber,
			newPartDescription,
			id,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

//THIS IS THE PORT WHICH THE BACKEND WILL BE CONNECTED TO
app.listen(3002, () => {
	console.log("Your server is running on port 3002.");
});
