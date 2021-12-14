"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const { PORT } = process.env;

app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const carsRouter = require("./app/routers/cars-routes");
//const usersRouter = require("./app/routers/users-routes");

app.use("/api/v1/cars", carsRouter);
//app.use("/api/v1/users", usersRouter);

app.listen(PORT, () => console.log(`Running ${PORT}`));
