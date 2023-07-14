const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

// connecting Database to Node.js
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server started at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}...`);
    process.exit(1);
  }
};

initializeDbAndServer();

// requesting to get books list
app.get("/books/", async (request, response) => {
  const getBooksQuarry = `SELECT * FROM book`;
  const booksList = await db.all(getBooksQuarry);
  response.send(booksList);
});
