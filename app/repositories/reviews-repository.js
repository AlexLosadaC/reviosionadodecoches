"use strict";

const getPool = require("../infrastructure/database");

async function addReviewByIdCar(idUser, idCAr, comment, rating) {
  const pool = await getPool();
  const sql = `INSERT INTO reviews (idUser, idCar, comment, rating, createdAt)
    VVALUES (?, ?, ?, ?, ?)`;

  const [reviews] = await pool.query(sql, [
    idUser,
    idCar,
    comment,
    rating,
    now,
  ]);
  return reviews.insertId;
}
async function findReviewsByCarId(idCar) {
  const pool = await getPool();
  const sql = "SELECT * FROM reviews WHERE id = ?";
  const [reviews] = await pool.query(sql, idCar);

  return reviews;
}

async function getRating(idCar) {
  const pool = await getPool();
  const sql =
    "SELECT AVG(rating) as media, COUNT(rating) as numValoraciones FROM reviews WHERE idCar = ?";
  const [reviews] = await pool.query(sql, idCar);

  return reviews[0].media;
}

module.exports = {
  addReviewByIdCar,
  findReviewsByCarId,
  getRating,
};
