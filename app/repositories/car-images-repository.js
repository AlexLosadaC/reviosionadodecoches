'use strict';

const getPool = require('../infrastructure/database');

async function addImageByCarId(idCar, fileName, principal = 0) {
  const pool = await getPool();
  const now = new Date();
  const sql = `INSERT INTO carImages(
    name,
    principal,
    idCar
    ) VALUES (?, ?, ?)`;
  const [cars] = await pool.query(sql, [fileName, principal ? 1 : 0, idCar]);

  return true;
}

async function findAllImageByCarId(idCar) {
  const pool = await getPool();
  const sql = `
    SELECT name, principal
    FROM carImages
    WHERE idCar = ?
    ORDER BY principal DESC
  `;
  const [cars] = await pool.query(sql, idCar);

  return cars;
}

async function removePrincipalByCarId(idCar) {
  const pool = await getPool();
  const sql = `
  UPDATE carImages
    SET principal = 0
    WHERE idCar = ?
  `;
  const [result] = await pool.query(sql, idCar);

  return (result.affectedRows === 1);
}

module.exports = {
  addImageByCarId,
  findAllImageByCarId,
  removePrincipalByCarId,
};