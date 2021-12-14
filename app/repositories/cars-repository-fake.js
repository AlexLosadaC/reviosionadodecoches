"use strict";

const cars = [
  {
    id: 1,
    brand: "Seat",
    model: "Ibiza",
    year: 2019,
    engine: "diesel",
    cv: 60,
  },
  {
    id: 2,
    brand: "Seat",
    model: "Toledo",
    year: 1999,
    engine: "diesel",
    cv: 120,
  },
];

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
  //const sql2 = 'SELECT * FROM cars WHERE model = ? AND brand = ?';
  // await pool.query(sql, [model1, model2]);
  return car[0];
}

async function addImageByCarId(idCar, imageCar) {
  const pool = await getPool();
  const now = new Date();
  const sql = ` INSERT INTO carImages(name, principal, idCar) VALUES (?, ?, ?)`;
  const [cars] = await pool.query(sql, [imageCar, 0, idCar]);
  return true;
}

module.exports = {
  findAllCars,
  findCarById,
  addImageByCarId,
};
