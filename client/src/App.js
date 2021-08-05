import "./App.css";
import Title from "./Banner.js";

function App() {
	return (
		<div class="App">
			<Title />
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
				<h2>Create Data Entry</h2>
				<p class="line1"></p>
				<div class="box">
					<h4>FTA Number:</h4>
					<input />
					<h4>FTA Revision:</h4>
					<input />
					<h4>Test Fixture:</h4>
					<input />
					<h4>Reference(s):</h4>
					<input />
					<h4>Part Number:</h4>
					<input />
					<h4>Part Revision:</h4>
					<input />
					<h4>APN Number</h4>
					<input />
					<h4>Part Description</h4>
					<input />
					<div class="addDataButton">
						<button>Add Data Entry</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
