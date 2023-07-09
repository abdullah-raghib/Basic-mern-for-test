const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("connection to atlas is successfull"))
.catch((err) => console.log(err));
