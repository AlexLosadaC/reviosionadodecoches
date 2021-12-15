'use strict';

const getPool = require('../infrastructure/database');

async function addCar(car) {
  const pool = await getPool();
  const now = new Date();
  const consulta = `INSERT INTO cars(
    brand,
    model,
    year,
    engine,
    cv,
    createdAt
    ) VALUES (?, ?, ?, ?, ?, ?)`;

  const { brand, model, year, engine, cv } = car;
  const [created] = await pool.query(consulta, [
    brand,
    model,
    year,
    engine,
    cv,
    now,
  ]);

  return created.insertId;
}

async function findAllBrands() {
  const pool = await getPool();
  const sql = 'SELECT brand FROM cars WHERE 1 GROUP BY brand ORDER BY RAND()';
  const [brands] = await pool.query(sql);

  return brands;
}

async function findAllCars() {
  const pool = await getPool();
  const sql = 'SELECT * FROM cars';
  const [cars] = await pool.query(sql);

  return cars;
}

async function findCarById(id) {
  const pool = await getPool();
  const sql = 'SELECT * FROM cars WHERE id = ?';
  const [car] = await pool.query(sql, id);

  return car[0];
}

async function removeCarById(idCar) {
  const pool = await getPool();
  const sql = 'DELETE FROM cars WHERE id = ?';
  await pool.query(sql, idCar);

  return true;
}

async function updateCar(id, car) {
  const { brand, model, year, engine, cv } = car;
  const now = new Date();
  const pool = await getPool();
  const sql = `
    UPDATE cars
    SET brand = ?, model = ?, year = ?, engine = ?, cv = ?, updatedAt = ?
    WHERE id = ?`;
  const [result] = await pool.query(sql, [brand, model, year, engine, cv, now, id]);

  return (result.affectedRows === 1);
}

module.exports = {
  addCar,
  findAllBrands,
  findAllCars,
  findCarById,
  removeCarById,
  updateCar,
}