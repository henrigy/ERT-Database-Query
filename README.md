# ERT-Database-Query

## Version 2

This is a CRUD web application with the purpose of facilitating the ERT's acquisition of the online references and documents necessary to rework obsolete electronic components.

## Instructions for Importing an Existing Database into MySQL

The Excel spreadsheet "Adapted All FTAs Excel for MySQL Upload.csv" has already been adapted for MySQL upload. This file can be found in my designated intern folder.

#### 1.) Have "Adapted All FTAs Excel for MySQL Upload.csv" downloaded

#### 2.) Open MySQL Workbench

#### 3.) Create a new schema named "ertdatabase" and click "Apply" (Icon should be under "Query" and look like a cylinder with a small plus icon)

#### 4.) Another prompt will appear. Click "Apply" and then "Finish"

#### 5.) Your new schema will appear on the left under "Navigator"

#### 6.) Locate "ertdatabase" and click on the down arrow to expand the dropdown

#### 7.) Right click on "Tables" and select "Create Table..."

#### 8.) Name the table "data"

#### 9.) For column name for each "Column Name" are as follows -- their names are also case sensitive:

##### id

##### FTANumber

##### FTARevision

##### testFixture

##### reference

##### partNumber

##### partRevision

##### APNNumber

##### partDescription

#### When creating this new table, the column name "id" needs to have "Datatype" "INT" and "PK", "NN", and "AI" checked off. All other columns only need "Datatpe" "TEXT(500)" and "NN" checked off. Then select "Apply"
