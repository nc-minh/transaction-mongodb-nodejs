const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// Init routes
const router = require("./src/routes");
app.use(router);

// Connect mongoDB
const db = require("./src/app/models");
db.connect();

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
