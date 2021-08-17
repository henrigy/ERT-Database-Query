# ERT-Database-Query

## Version 2

This is a CRUD web application with the purpose of facilitating the ERT's acquisition of the online references and documents necessary to rework obsolete electronic components.

## Instructions for Uploading an Existing Database into MySQL

### 1.) Setting up your Excel spreadsheet

##### a.) Open a blank Excel spreadsheet

##### b.) Preserve leading zeroes in the data entries by highlighting an area large enough to fit the dimensions of your data entires, right click and select "Format Cells", select "Text", and then select "Ok"

##### c.) Open the spreadsheet with the existing data entries (All FTAs.xlsx from my designated intern folder)

##### d.) From the spreadsheet with the existing data entries, highlight all of the filled rows and columns

##### e.) In the blank Excel spreadsheet, to preserve formatting, right click on the top leftmost cell and select "Paste Special...", for "As:", select "Text" to insert the contents of the clipboard without any formatting, and then select "Ok"

##### f.) With the inserted data entries, delete the first column and in its place, create a new blank column

##### g.) In the first row, rename each column in the following order "id", "FTANumber", "FTARevision," "testFixture", "reference", "partNumber", "partRevision", "APNNumber", and "partDescription"

##### h.) Sort the entries according to FTA Number from lowest to highest by highlighting all of the entries from Row 2 and below, right click and select "Sort" and then "Sort A to Z"

##### i.) In the first column, beginning in Row 2, auto-increment each row. Linked is the YouTube tutorial for completing this step: https://www.youtube.com/watch?v=gz37w-p9LRA

##### j.) Convert this Excel file into a form compatitlbe to MySQL, by saving the file type as "CSV UTF-8 (Comma delimited)
