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

	const [dataList, setDataList] = useState([]);

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
			setDataList([
				...dataList,
				{
					FTANumber: FTANumber,
					FTARevision: FTARevision,
					testFixture: testFixture,
					reference: reference,
					partNumber: partNumber,
					partRevision: partRevision,
					APNNumber: APNNumber,
					partDescription: partDescription,
				},
			]);
		});
	};

	const getData = () => {
		Axios.get("http://localhost:3002/data").then((response) => {
			setDataList(response.data);
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
					<button onClick={getData}>Display All Data Entries</button>
				</div>
			</div>

			{/*area for adding a data entry*/}
			<div class="addingEntry">
				<h2>Create Data Entry:</h2>
				<h5 class="line1"></h5>
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

			{/*area for displaying data entries*/}
			<div class="dataDisplay">
				<h2>Data Display:</h2>
				{dataList.map((val, key) => {
					return (
						<div class="oneEntry">
							<p class="line2"></p>
							<div class="dataBox">
								<div class="topButtons">
									<button>Delete Data Entry</button>
									<button>Edit Data Entry</button>
								</div>
								<h4>FTA Number:</h4>
								<div class="value">
									<h5>{val.FTANumber}</h5>
								</div>
								<h4>FTA Revision:</h4>
								<div class="value">
									<h5>{val.FTARevision}</h5>
								</div>
								<h4>Test Fixture:</h4>{" "}
								<div class="value">
									<h5>{val.testFixture}</h5>
								</div>
								<h4>Reference(s):</h4>{" "}
								<div class="value">
									<h5>{val.reference}</h5>
								</div>
								<h4>Part Number:</h4>{" "}
								<div class="value">
									<h5>{val.partNumber}</h5>
								</div>
								<h4>Part Revision:</h4>{" "}
								<div class="value">
									<h5>{val.partRevision}</h5>
								</div>
								<h4>APN Number:</h4>{" "}
								<div class="value">
									<h5>{val.APNNumber}</h5>
								</div>
								<h4>Part Description:</h4>{" "}
								<div class="value">
									<h5>{val.partDescription}</h5>
								</div>
								<div class="bottomButtons">
									<button>Cancel Changes</button>
									<button>Save Changes</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
