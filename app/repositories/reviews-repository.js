'use strict';

const getPool = require('../infrastructure/database');

async function addReview(idUser, idCar, comment, rating) {
  const pool = await getPool();
  const now = new Date();
  const sql = `INSERT
    INTO reviews (idUser, idCar, comment, rating, createdAt)
    VALUES (?, ?, ?, ?, ?)`;
  const [created] = await pool.query(
    sql, [idUser, idCar, comment, rating, now]
  );

  return created.insertId;
}

async function removeReviewById(id) {
  const pool = await getPool();
  const sql = 'DELETE FROM reviews WHERE id = ?';
  const [reviews] = await pool.query(sql, id);

  return reviews;
}

async function findReviewById(id) {
  const pool = await getPool();
  const sql = 'SELECT * FROM reviews WHERE id = ?';
  const [reviews] = await pool.query(sql, id);

  return reviews;
}

async function findReviewsByCarId(idCar) {
  const pool = await getPool();
  const sql = 'SELECT * FROM reviews WHERE idCar = ?';
  const [reviews] = await pool.query(sql, idCar);

  return reviews;
}

async function findReviewsByUserId(idUser) {
  const pool = await getPool();
  const sql = `SELECT reviews.*, cars.brand, cars.model, cars.year
    FROM reviews
    LEFT JOIN cars ON cars.id = reviews.idCar
    WHERE idUser = ?`;
  const [reviews] = await pool.query(sql, idUser);

  return reviews;
}

async function findAllReviews() {
  const pool = await getPool();
  //const sql = 'SELECT * FROM reviews';
  const sql = `SELECT reviews.*, users.name, cars.brand, cars.model, cars.year
    FROM reviews
    INNER JOIN users ON users.id = reviews.idUser
    INNER JOIN cars ON cars.id = idCar`;
  const [reviews] = await pool.query(sql);

  return reviews;
}

async function getRating(idCar) {
  const pool = await getPool();
  const sql = `
    SELECT
    AVG(rating) as media,
    COUNT(rating) as numValoraciones
    FROM reviews WHERE idCar = ?`;
  const [reviews] = await pool.query(sql, idCar);

  return reviews[0];
}

module.exports = {
  addReview,
  findAllReviews,
  findReviewById,
  findReviewsByCarId,
  findReviewsByUserId,
  getRating,
  removeReviewById,
};
