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

  return car[0];
}

async function updateCar(id, car) {
  const { brand, model, year, engine, cv } = car;
  const now = new Date();
  const pool = await getpool();
  const sql = `
  UPDATE cars
  SET brand = ?, model = ?, year = ?, engine = ?, cv = ?, updatedAt = ?
   WHERE id =? `;

  await pool.query(sql, [brand, model, year, engine, cv, now, id]);

  return true;
}

module.exports = {
  findAllCars,
  findCarById,
};
