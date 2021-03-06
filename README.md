# ERT-Database-Query

## Version 2

This is a CRUD web application with the purpose of facilitating the ERT's acquisition of the online references and documents necessary to rework obsolete electronic components.

## Instructions for Importing an Existing Database into MySQL

### The Excel spreadsheet "Adapted All FTAs Excel for MySQL Upload.csv" has already been adapted for MySQL upload. This file can be found in my designated intern folder.

#### 1.) Have "Adapted All FTAs Excel for MySQL Upload.csv" downloaded

#### 2.) Open MySQL Workbench

#### 3.) Create a new schema named "ertdatabase" and click "Apply" (Icon should be beneath "Query" and look like a cylinder with a small plus icon)

#### 4.) Another prompt will appear. Click "Apply" and then "Finish"

#### 5.) Your new schema will appear on the left under "Navigator"

#### 6.) Locate "ertdatabase" and click on the down arrow to expand the dropdown

#### 7.) Right click on "Tables" and select "Create Table..."

#### 8.) Name the table "data"

#### 9.) Each "Column Name" is as follows -- the names are also case sensitive (double click in the area under "Column Name" to add each row):

##### - id

##### - FTANumber

##### - FTARevision

##### - testFixture

##### - reference

##### - partNumber

##### - partRevision

##### - APNNumber

##### - partDescription

#### When creating this new table, the column name "id" needs to have the "Datatype" "INT" and "PK", "NN", and "AI" checked off. All other columns only need the "Datatpe" "TEXT(500)" and "NN" checked off. Then select "Apply"

#### 10.) Another prompt will appear. Click "Apply" and then "Finish"

#### 11.) This new table can be found under the "Tables" dropdown corresponding to the "ertdatabase" schema

#### 12.) Right click on the "data" table and select "Table Data Import Wizard"

#### 13.) Browse for and select the "Adapted All FTAs Excel for MySQL Upload.csv" file path

#### 14.) Continue clicking "Next" (a total of two times) until arriving at the "Configure Import Settings" screen

#### 15.) Match each "Dest Column" selection to its corresponding "Columns" name to the left, uncheck all "MyUnknownColumn" checkboxes, and then select "Next"

#### 16.) On the "Import Data" screen, click "Next" and then "Next" again once the data has finished being imported

#### 17.) On the "Import Results" screen, click "Finish"

#### 18.) To verify the data import, right click on the "data" table and select "Select Rows - Limit 1000"

#### 19.) To refresh the table at any time, click on the first lighting bolt icon

#### 20.) Go to the index.js file in this repository's server folder and change the password to reflect your personal MySQL database login information (lines 9-16)
