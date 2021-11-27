"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;
app.use(express.json());

const carsRouter = require("./app/routers/cars-routes");
//const usersRouter = require("./app/routers/users-routes");

app.use("/api/v1/cars", carsRouter);
//app.use("/api/v1/users", usersRouter);

app.listen(PORT, () => console.log(`Running ${PORT}`));
