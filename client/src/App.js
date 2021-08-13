import "./App.css";
import Banner from "./Banner.js";
import { useState } from "react";
import Axios from "axios";

function App() {
	//state hooks for storing the data entry values
	const [FTANumber, setFTANumber] = useState("");
	const [FTARevision, setFTARevision] = useState("");
	const [testFixture, setTestFixture] = useState("");
	const [reference, setReference] = useState("");
	const [partNumber, setPartNumber] = useState("");
	const [partRevision, setPartRevision] = useState("");
	const [APNNumber, setAPNNumber] = useState("");
	const [partDescription, setPartDescription] = useState("");
	const [dataList, setDataList] = useState([]);

	//state hooks for modals and button presses
	const [createDataEntryVisible, setCreateDataEntryVisible] = useState(false);
	const [dataDisplayVisible, setDataDisplayVisible] = useState(false);
	const [resultsVisible, setResultsVisible] = useState(false);
	const [searchOperator, setSearchOperator] = useState("");
	const [displaySearchOperator, setDisplaySearchOperator] = useState("");
	const [saveAddedEntryVisible, setSaveAddedEntryVisible] = useState(false);
	const [saveConfirmVisible, setSaveConfirmVisible] = useState(false);
	const [cancelAddVisible, setCancelAddVisible] = useState(false);
	const [deletingEntryVisible, setDeletingEntryVisible] = useState(false);
	const [buttonID, setButtonID] = useState("");
	const [editButtonPressed, setEditButtonPressed] = useState(false);
	const [cancelEditVisible, setCancelEditVisible] = useState(false);
	const [saveEditVisible, setSaveEditVisible] = useState(false);
	const [nothing] = useState("");
	const [missingFTAVisible, setMissingFTAVisible] = useState(false);

	//state hooks for editing the data entry values
	const [editFTANumber, setEditFTANumber] = useState("");
	const [editFTARevision, setEditFTARevision] = useState("");
	const [editTestFixture, setEditTestFixture] = useState("");
	const [editReference, setEditReference] = useState("");
	const [editPartNumber, setEditPartNumber] = useState("");
	const [editPartRevision, setEditPartRevision] = useState("");
	const [editAPNNumber, setEditAPNNumber] = useState("");
	const [editPartDescription, setEditPartDescription] = useState("");
	const [editDisplayFTANumber, setEditDisplayFTANumber] = useState("");
	const [editID, setEditID] = useState("");

	//AXIOS REQUESTS AND REPONSES
	//Axios response to creating and saving a new data entry and updating the frontend display to reflect changes immediately
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

	//Axios fetch request to display all data entries within the database
	const getData = () => {
		setCreateDataEntryVisible(false);
		setDataDisplayVisible(true);
		setResultsVisible(false);
		Axios.get("http://localhost:3002/data").then((response) => {
			setDataList(response.data);
		});
	};

	//Axios fetch request to display all data entries within the database for a given search operator
	const getSearch = () => {
		setResultsVisible(true);
		setCreateDataEntryVisible(false);
		setDataDisplayVisible(false);
		setDisplaySearchOperator(searchOperator);
		console.log(searchOperator);

		Axios.get(`http://localhost:3002/search/${searchOperator}`).then(
			(response) => {
				setDataList(response.data);
			}
		);
	};

	//Axios reponse to deleting a data entry and updating the frontend display to reflect changes immediately
	const deleteData = (id) => {
		Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
			setDataList(
				dataList.filter((val) => {
					return val.id !== id;
				})
			);
		});
	};

	//Axios response to editing a data entry and updating the frontend display to reflect changes immediately
	const updateData = (id) => {
		Axios.put("http://localhost:3002/update", {
			newFTANumber: editFTANumber,
			newFTARevision: editFTARevision,
			newTestFixture: editTestFixture,
			newReference: editReference,
			newPartNumber: editPartNumber,
			newPartRevision: editPartRevision,
			newAPNNumber: editAPNNumber,
			newPartDescription: editPartDescription,

			id: id,
		}).then((response) => {
			setDataList(
				dataList.map((val) => {
					return val.id === id
						? {
								id: val.id,
								FTANumber: editFTANumber,
								FTARevision: editFTARevision,
								testFixture: editTestFixture,
								reference: editReference,
								partNumber: editPartNumber,
								partRevision: editPartRevision,
								APNNumber: editAPNNumber,
								partDescription: editPartDescription,
						  }
						: val;
				})
			);
		});
	};

	//UI/UX FUNCTIONS
	//reset new data entry fields after cancelling the process
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

	//displays "Create Data Entry:" screen with blank input fields
	const showCreateDataEntry = () => {
		setCreateDataEntryVisible(true);
		setDataDisplayVisible(false);
		setResultsVisible(false);
		setFTANumber("");
		setFTARevision("");
		setTestFixture("");
		setReference("");
		setPartNumber("");
		setPartRevision("");
		setAPNNumber("");
		setPartDescription("");
	};

	//hides the modal confirming the decision to delete a data entry, deletes the selected entry, and shows the modal confirming that the database has been updated
	const deleteEntry = () => {
		setDeletingEntryVisible(false);
		deleteData(buttonID);
		setSaveConfirmVisible(true);
	};

	return (
		<div class="App">
			<Banner />

			{/*"SEARCH AREA" DISPLAY*/}
			{/*search input, "Search" button, "Create Data Entry" button, and "Display All Data Entries" button*/}
			<div class="searchArea">
				<div class="topRow">
					<h2>PVGS Electronic Rework Team Query</h2>
					<div class="searchInput">
						<div class="input">
							<input
								autoComplete="off"
								style={{ paddingLeft: "3px" }}
								onChange={(e) => setSearchOperator(e.target.value)}
								placeholder="FTA Number"
								type="number"
							></input>
							<button onClick={getSearch}>Search</button>
						</div>
					</div>
				</div>
				<div class="moreButtons">
					<button onClick={showCreateDataEntry}>Create Data Entry</button>
					<button onClick={getData}>Display All Data Entries</button>
				</div>
			</div>

			{/*"CREATE DATA ENTRY" DISPLAY*/}
			{/*Inputs for creating a data entry's FTA Number, FTA Revision, Test Fixture, Reference(s), Part Number, Part Revision, APN Number, and Part Description, "Cancel Data Entry" button, and "Save Data" Entry*/}
			<div
				class="addingEntry"
				style={{ display: createDataEntryVisible ? "block" : "none" }}
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
						<button
							onClick={() => {
								if (FTANumber !== nothing) {
									setSaveAddedEntryVisible(true);
								} else {
									setMissingFTAVisible(true);
								}
							}}
						>
							Save Data Entry
						</button>
					</div>
				</div>
			</div>

			{/*"DISPLAY ALL DATA ENTRIES" DISPLAY*/}
			{/*displaying all data entries in the database, "Delete Data Entry" button, and "Edit Data Entry" button*/}
			<div
				class="dataDisplay"
				style={{ display: dataDisplayVisible ? "block" : "none" }}
			>
				<h2>Data Display:</h2>
				<p class="line2"></p>

				{dataList.map((val, key) => {
					return (
						<div class="dataBox">
							<div class="oneEntry">
								<div class="topButtons">
									<button
										onClick={() => {
											setDeletingEntryVisible(true);
											setButtonID(val.id);
										}}
									>
										Delete Data Entry
									</button>

									<button
										onClick={() => {
											setEditID(val.id);
											setEditDisplayFTANumber(val.FTANumber);
											setEditFTANumber(val.FTANumber);
											setEditFTARevision(val.FTARevision);
											setEditTestFixture(val.testFixture);
											setEditReference(val.reference);
											setEditPartNumber(val.partNumber);
											setEditPartRevision(val.partRevision);
											setEditAPNNumber(val.APNNumber);
											setEditPartDescription(val.partDescription);

											setEditButtonPressed(true);
										}}
									>
										Edit Data Entry
									</button>
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
							</div>
						</div>
					);
				})}
			</div>

			{/*"RESULTS FOR FTA NUMBER '###'" DISPLAY*/}
			{/*displays data entries with FTA Numbers that match the search operator, "Delete Data Entry" button, and "Edit Data Entry" button*/}
			<div
				class="searchScreen"
				style={{ display: resultsVisible ? "block" : "none" }}
			>
				<h2>Results for FTA Number "{displaySearchOperator}":</h2>
				<p class="line3"></p>

				{dataList.map((val, key) => {
					if (displaySearchOperator !== nothing) {
						return (
							<div class="dataBox">
								<div class="oneEntry">
									<div class="topButtons">
										<button
											onClick={() => {
												setDeletingEntryVisible(true);
												setButtonID(val.id);
											}}
										>
											Delete Data Entry
										</button>

										<button
											onClick={() => {
												setEditID(val.id);
												setEditDisplayFTANumber(val.FTANumber);
												setEditFTANumber(val.FTANumber);
												setEditFTARevision(val.FTARevision);
												setEditTestFixture(val.testFixture);
												setEditReference(val.reference);
												setEditPartNumber(val.partNumber);
												setEditPartRevision(val.partRevision);
												setEditAPNNumber(val.APNNumber);
												setEditPartDescription(val.partDescription);

												setEditButtonPressed(true);
											}}
										>
											Edit Data Entry
										</button>
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
								</div>
							</div>
						);
					}
				})}
			</div>

			{/*MODALS*/}
			{/*modal confirming that the user wants to save the created data entry*/}
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

			{/*modal confirming that the changes the user made have been added to the database*/}
			<div
				class="saveConfirm"
				style={{ display: saveConfirmVisible ? "block" : "none" }}
			>
				<div class="saveConfirmContent">
					<h3>
						Your changes have been saved and the database has been updated.
					</h3>
					<button onClick={() => setSaveConfirmVisible(false)}>
						Return to Main Display
					</button>
				</div>
			</div>

			{/*modal confirming that the user wants to cancel the changes made to adding a new data entry*/}
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

			{/*modal confirming that the user wants to delete the selected data entry*/}
			<div
				class="deletingEntry"
				style={{ display: deletingEntryVisible ? "block" : "none" }}
			>
				<div class="deletingEntryContent">
					<h3>
						Deleting a data entry will PERMANENTLY REMOVE it from the database.
						Are you sure that you want to delete this entry?
					</h3>
					<button onClick={() => setDeletingEntryVisible(false)}>
						Cancel Delete
					</button>
					<button onClick={deleteEntry}>Delete Entry</button>
				</div>
			</div>

			{/*modal allowing the user to edit the selected data entry*/}
			<div
				class="editingEntry"
				style={{
					display: editButtonPressed ? "block" : "none",
				}}
			>
				<div class="editingEntryContent">
					<h2>Editing Data Entry for FTA Number "{editDisplayFTANumber}"</h2>
					<p class="line4"></p>

					<div class="editBox">
						<h4>FTA Number: </h4>
						<input
							type="number"
							value={editFTANumber}
							onChange={(event) => {
								setEditFTANumber(event.target.value);
							}}
						/>
						<h4>FTA Revision: </h4>
						<input
							type="number"
							value={editFTARevision}
							onChange={(event) => {
								setEditFTARevision(event.target.value);
							}}
						/>
						<h4>Test Fixture: </h4>
						<input
							type="text"
							value={editTestFixture}
							onChange={(event) => {
								setEditTestFixture(event.target.value);
							}}
						/>
						<h4>Reference(s):</h4>
						<input
							type="text"
							value={editReference}
							onChange={(event) => {
								setEditReference(event.target.value);
							}}
						/>
						<h4>Part Number:</h4>
						<input
							type="text"
							value={editPartNumber}
							onChange={(event) => {
								setEditPartNumber(event.target.value);
							}}
						/>
						<h4>Part Revision:</h4>
						<input
							type="text"
							value={editPartRevision}
							onChange={(event) => {
								setEditPartRevision(event.target.value);
							}}
						/>
						<h4>APN Number:</h4>
						<input
							type="number"
							value={editAPNNumber}
							onChange={(event) => {
								setEditAPNNumber(event.target.value);
							}}
						/>
						<h4>Part Description</h4>
						<input
							type="text"
							value={editPartDescription}
							onChange={(event) => {
								setEditPartDescription(event.target.value);
							}}
						/>
						<div class="bottomButtons">
							<button
								onClick={() => {
									setCancelEditVisible(true);
								}}
							>
								Cancel Changes
							</button>
							<button
								onClick={() => {
									if (editFTANumber !== nothing) {
										setSaveEditVisible(true);
									} else {
										setMissingFTAVisible(true);
									}
								}}
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>

			{/*modal confirming that the user wants to cancel the edits made to the selected data entry*/}
			<div
				class="cancelEdits"
				style={{ display: cancelEditVisible ? "block" : "none" }}
			>
				<div class="cancelEditsContent">
					<h3>
						Are you sure that you want to cancel the edits made? Cancelling will
						reset all changes.
					</h3>
					<button onClick={() => setCancelEditVisible(false)}>No</button>
					<button
						onClick={() => {
							setCancelEditVisible(false);
							setEditButtonPressed(false);
						}}
					>
						Yes
					</button>
				</div>
			</div>

			{/*modal confirming that the user wants to save the edits made to a specific data entry*/}
			<div
				class="saveEdits"
				style={{ display: saveEditVisible ? "block" : "none" }}
			>
				<div class="saveEditsContent">
					<h3>
						Are you sure that you want to save the edits made to this data
						entry? Saving this data entry will update the database.
					</h3>
					<button onClick={() => setSaveEditVisible(false)}>No</button>
					<button
						onClick={() => {
							setSaveEditVisible(false);
							setEditButtonPressed(false);
							setSaveConfirmVisible(true);
							updateData(editID);
						}}
					>
						Yes
					</button>
				</div>
			</div>

			{/*modal alerting the user that the FTA Number field is blank and requires a value*/}
			<div
				class="missingFTA"
				style={{ display: missingFTAVisible ? "block" : "none" }}
			>
				<div class="missingFTAContent">
					<h3>
						There is no value inputted for "FTA Number". This field cannot be
						left be blank.
					</h3>
					<button onClick={() => setMissingFTAVisible(false)}>
						Return to Editing
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
