const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
const router = require("./router/Auth");
app.use('/', router)

dotenv.config({ path: "./config.env" });

require('./db/conn');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
