import "./App.css";
import Banner from "./Banner.js";
import { useState } from "react";
import Axios from "axios";

function App() {
	const [FTANumber, setFTANumber] = useState(0);
	const [FTARevision, setFTARevision] = useState(0);
	const [testFixture, setTestFixture] = useState("");
	const [reference, setReference] = useState("");
	const [partNumber, setPartNumber] = useState("");
	const [partRevision, setPartRevision] = useState("");
	const [APNNumber, setAPNNumber] = useState(0);
	const [partDescription, setPartDescription] = useState("");

	const addData = () => {
		Axios.post("http://localhost:3002/create", {
			FTANumber: FTANumber,
			FTARevision: FTARevision,
			testFixture: testFixture,
			reference: reference,
			partNumber: partNumber,
			partRevision: partRevision,
			APNNumber: APNNumber,
			partDescription: partDescription,
		}).then(() => {
			console.log("success");
		});
	};

	return (
		<div class="App">
			<Banner />
			{/*area for search bar, add entry button, & display all entries button*/}
			<div class="searchArea">
				<div class="topRow">
					<h2>PVGS Electronic Rework Team Query</h2>
					<div class="searchInput">
						<div class="input">
							<input autoComplete="off" style={{ paddingLeft: "3px" }}></input>
							<button>Search</button>
						</div>
					</div>
				</div>
				<div class="moreButtons">
					<button>Create Data Entry</button>
					<button>Display All Data Entries</button>
				</div>
			</div>

			{/*area for adding a data entry*/}
			<div class="addingEntry">
				<h2>Create Data Entry:</h2>
				<p class="line1"></p>
				<div class="box">
					<h4>FTA Number:</h4>
					<input
						type="number"
						onChange={(event) => {
							setFTANumber(event.target.value);
						}}
					/>

					<h4>FTA Revision:</h4>
					<input
						type="number"
						onChange={(event) => {
							setFTARevision(event.target.value);
						}}
					/>

					<h4>Test Fixture:</h4>
					<input
						type="text"
						onChange={(event) => {
							setTestFixture(event.target.value);
						}}
					/>

					<h4>Reference(s):</h4>
					<input
						type="text"
						onChange={(event) => {
							setReference(event.target.value);
						}}
					/>

					<h4>Part Number:</h4>
					<input
						type="text"
						onChange={(event) => {
							setPartNumber(event.target.value);
						}}
					/>

					<h4>Part Revision:</h4>
					<input
						type="text"
						onChange={(event) => {
							setPartRevision(event.target.value);
						}}
					/>

					<h4>APN Number:</h4>
					<input
						type="number"
						onChange={(event) => {
							setAPNNumber(event.target.value);
						}}
					/>

					<h4>Part Description:</h4>
					<input
						type="text"
						onChange={(event) => {
							setPartDescription(event.target.value);
						}}
					/>

					<div class="addDataButton">
						<button>Cancel Data Entry</button>
						<button onClick={addData}>Save Data Entry</button>
					</div>
				</div>
			</div>

			{/*area for display data entry*/}
			<div class="dataDisplay">
				<h2>Data Display:</h2>
				<p class="line2"></p>
				<div class="entryBox">
					<div class="editEntryButton">
						<button>Edit Data Entry</button>
					</div>
					<h4>FTA Number:</h4>
					<h4>FTA Revision:</h4>
					<h4>Test Fixture:</h4>
					<h4>Reference(s):</h4>
					<h4>Part Number:</h4>
					<h4>Part Revision:</h4>
					<h4>APN Number:</h4>
					<h4>Part Description:</h4>
					<div class="cancelSaveEntry">
						<button>Cancel Changes</button>
						<button>Save Changes</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
