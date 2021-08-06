import "./App.css";
import Banner from "./Banner.js";
import { useState } from "react";
import Axios from "axios";

function App() {
	const [FTANumber, setFTANumber] = useState("");
	const [FTARevision, setFTARevision] = useState("");
	const [testFixture, setTestFixture] = useState("");
	const [reference, setReference] = useState("");
	const [partNumber, setPartNumber] = useState("");
	const [partRevision, setPartRevision] = useState("");
	const [APNNumber, setAPNNumber] = useState("");
	const [partDescription, setPartDescription] = useState("");

	const [dataList, setDataList] = useState([]);

	const [allDataVisible, setAllDataVisible] = useState(false);
	const [createVisible, setCreateVisible] = useState(false);
	const [saveAddedEntryVisible, setSaveAddedEntryVisible] = useState(false);
	const [deleteVisible, setDeleteVisible] = useState(false);
	const [saveConfirmVisible, setSaveConfirmVisible] = useState(false);
	const [searchOperator, setSearchOperator] = useState("");
	const [searchOperatorDisplay, setSearchOperatorDisplay] = useState("");
	const [searchScreenVisible, setSearchScreenVisible] = useState(false);
	const [cancelAddVisible, setCancelAddVisible] = useState(false);

	const nowSearching = () => {
		setAllDataVisible(false);
		setCreateVisible(false);
		setSearchScreenVisible(true);
		setSearchOperatorDisplay(searchOperator);
	};

	const addData = () => {
		setSaveAddedEntryVisible(false);
		setSaveConfirmVisible(true);
		setFTANumber("");
		setFTARevision("");
		setTestFixture("");
		setReference("");
		setPartNumber("");
		setPartRevision("");
		setAPNNumber("");
		setPartDescription("");

		console.log("setChangesSavedVisible is true");

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

	const resetValues = () => {
		setCancelAddVisible(false);
		setFTANumber("");
		setFTARevision("");
		setTestFixture("");
		setReference("");
		setPartNumber("");
		setPartRevision("");
		setAPNNumber("");
		setPartDescription("");
	};

	const getData = () => {
		setAllDataVisible(true);
		setCreateVisible(false);
		setSearchScreenVisible(false);
		Axios.get("http://localhost:3002/data").then((response) => {
			setDataList(response.data);
		});
	};

	const showCreatePanel = () => {
		setAllDataVisible(false);
		setCreateVisible(true);
		setSearchScreenVisible(false);
		setSaveAddedEntryVisible(false);
		setFTANumber("");
		setFTARevision("");
		setTestFixture("");
		setReference("");
		setPartNumber("");
		setPartRevision("");
		setAPNNumber("");
		setPartDescription("");
	};

	const deleteDataEntry = (id) => {
		Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
			setDataList(
				dataList.filter((val) => {
					return val.id != id;
				})
			);
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
							<input
								autoComplete="off"
								style={{ paddingLeft: "3px" }}
								value={searchOperator}
								onChange={(e) => setSearchOperator(e.target.value)}
							></input>
							<button onClick={nowSearching}>Search</button>
						</div>
					</div>
				</div>
				<div class="moreButtons">
					<button onClick={showCreatePanel}>Create Data Entry</button>
					<button onClick={getData}>Display All Data Entries</button>
				</div>
			</div>

			{/*area for adding a data entry*/}
			<div
				class="addingEntry"
				style={{ display: createVisible ? "block" : "none" }}
			>
				<h2>Create Data Entry:</h2>
				<p class="line1"></p>
				<div class="box">
					<h4>FTA Number:</h4>
					<input
						type="number"
						value={FTANumber}
						onChange={(event) => {
							setFTANumber(event.target.value);
						}}
					/>

					<h4>FTA Revision:</h4>
					<input
						type="number"
						value={FTARevision}
						onChange={(event) => {
							setFTARevision(event.target.value);
						}}
					/>

					<h4>Test Fixture:</h4>
					<input
						type="text"
						value={testFixture}
						onChange={(event) => {
							setTestFixture(event.target.value);
						}}
					/>

					<h4>Reference(s):</h4>
					<input
						type="text"
						value={reference}
						onChange={(event) => {
							setReference(event.target.value);
						}}
					/>

					<h4>Part Number:</h4>
					<input
						type="text"
						value={partNumber}
						onChange={(event) => {
							setPartNumber(event.target.value);
						}}
					/>

					<h4>Part Revision:</h4>
					<input
						type="text"
						value={partRevision}
						onChange={(event) => {
							setPartRevision(event.target.value);
						}}
					/>

					<h4>APN Number:</h4>
					<input
						type="number"
						value={APNNumber}
						onChange={(event) => {
							setAPNNumber(event.target.value);
						}}
					/>

					<h4>Part Description:</h4>
					<input
						type="text"
						value={partDescription}
						onChange={(event) => {
							setPartDescription(event.target.value);
						}}
					/>

					<div class="addDataButton">
						<button onClick={() => setCancelAddVisible(true)}>
							Cancel Data Entry
						</button>
						<button onClick={() => setSaveAddedEntryVisible(true)}>
							Save Data Entry
						</button>
					</div>
				</div>
			</div>

			{/*area for displaying data entries*/}
			<div
				class="dataDisplay"
				style={{ display: allDataVisible ? "block" : "none" }}
			>
				<h2>Data Display:</h2>
				<p class="line2"></p>

				{dataList.map((val, key) => {
					return (
						<div class="oneEntry">
							<div class="dataBox">
								<div class="topButtons">
									<button onClick={() => setDeleteVisible(true)}>
										Delete Data Entry
									</button>
									<button>Edit Data Entry</button>
								</div>
								{/*modal for deleting an existing data entry*/}
								<div
									class="deleteExistingEntry"
									style={{ display: deleteVisible ? "block" : "none" }}
								>
									<div class="deleteExistingEntryContent">
										<h3>
											Are you sure that you want to delete this data entry?
											Deleting this data entry will remove it from the database.
										</h3>
										<button onClick={() => setDeleteVisible(false)}>No</button>
										<button
											onClick={() => {
												setSaveConfirmVisible(true);
												setDeleteVisible(false);
												deleteDataEntry(val.id);
											}}
										>
											Yes
										</button>
									</div>
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

			{/*search display*/}
			<div
				class="searchScreen"
				style={{ display: searchScreenVisible ? "block" : "none" }}
			>
				<h2>Search Results for "{searchOperatorDisplay}":</h2>
				<p class="line3"></p>
			</div>

			{/*creating the modals*/}
			{/*modal for saving an added data entry */}
			<div
				class="saveAddedEntry"
				style={{ display: saveAddedEntryVisible ? "block" : "none" }}
			>
				<div class="saveAddedEntryContent">
					<h3>
						Are you sure that you want to save this data entry? Saving this data
						entry will update the database.
					</h3>
					<button onClick={() => setSaveAddedEntryVisible(false)}>No</button>
					<button onClick={addData}>Yes</button>
				</div>
			</div>

			{/*modal for confirming saved changes*/}
			<div
				class="saveConfirm"
				style={{ display: saveConfirmVisible ? "block" : "none" }}
			>
				<div class="saveConfirmContent">
					<h3>
						Your changes have been saved, and the database has been updated with
						the saved changes.
					</h3>
					<button onClick={() => setSaveConfirmVisible(false)}>
						Return to Main Display
					</button>
				</div>
			</div>

			{/*modal confirming cancelling changes on the create data entry display */}
			<div
				class="cancelAdd"
				style={{ display: cancelAddVisible ? "block" : "none" }}
			>
				<div class="cancelAddContent">
					<h3>
						Are you sure that you want to cancel the edits made? Cancelling will
						reset all changes.
					</h3>
					<button onClick={() => setCancelAddVisible(false)}>No</button>
					<button onClick={resetValues}>Yes</button>
				</div>
			</div>
		</div>
	);
}

export default App;
