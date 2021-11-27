"use strict";

const getPool = require("../infrastructure/database");

async function findAllCars() {
  const pool = await getPool();
  const sql = "SELECT * FROM cars";
  const [cars] = await pool.query(sql);
  return cars;
}

async function findCarById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM cars WHERE id = ?";
  const [car] = await pool.query(sql, id);

  return car;
}
module.exports = {
  findAllCars,
  findCarById,
};
