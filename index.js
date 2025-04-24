const express = require("express");
const cookieParser = require('cookie-parser')
const config = require("./src/config");
const router = require("./src/routers");
const mongoDbConnection = require("./src/db");
mongoDbConnection();
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use("/uploads", express.static(__dirname + "/src/uploads"));


app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})