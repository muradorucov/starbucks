const express = require("express");
const cookieParser = require('cookie-parser')
const config = require("./src/config");
const router = require("./src/routers");
require("./src/db/connnectMongoDb")();
const app = express();


app.use(cookieParser());
app.use(express.json());

app.use(router);


app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})