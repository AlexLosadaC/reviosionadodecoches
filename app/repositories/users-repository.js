"use strict";

const getPool = require("../infrastructure/database");

async function createUser(user) {
  const pool = await getPool();
  const sql = `
    INSERT INTO users(
      name, email, password, verificationCode, role,
      createdAt
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;
  const { name, email, passwordHash, verificationCode } = user;
  const now = new Date();
  const [created] = await pool.query(sql, [
    name,
    email,
    passwordHash,
    verificationCode,
    "reader",
    now,
  ]);
  console.log("created", created);
  return created.insertId;
}

async function findUserByEmail(email) {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email, role, password, verifiedAt FROM users WHERE email = ?";
  const [user] = await pool.query(sql, email);
  return user[0];
}

async function findUserById(id) {
  const pool = await getPool();
  const sql =
    "SELECT name, email, password, verifiedAt FROM users WHERE email = ?";
  const [user] = await pool.query(sql, id);
}

async function findAllUsers() {
  const pool = await getPool();
  const sql = "SELECT id, name, email, verifiedAt FROM users";
  const [users] = await pool.query(sql);
  return users;
}

async function activateUser(verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
  UPTDATE users
  SET verifiedAt = ?
  WHERE verificationCode = ?
  AND verfiedAt IS NULL`;
  const [result] = await pool.query(sql, [now, verificationCode]);
  return result.affectedRows === 1;
}

async function getUserByVerificationCode(code) {
  const pool = await getPool();
  const sql = `
  SELECT name, email
  FROM users WHERE verificationCode = ?
  `;
  const [user] = await pool.query(sql);
  return user;
}

async function removeUserById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM users WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

async function uploadUserImage(id, image) {
  const pool = await getPool();
  const sql = `UPDATE users SET image = ? Where id = ?`;
  await pool.query(sql, [image, id]);

  return true;
}
async function updateUser(user) {
  const { id, name, email, password } = user;
  const pool = await getPool();
  const sql = `UPDATE users 
  SET name = ?, email = ?, password = ?, updatedAt = ? WHERE id = ?`;

  await pool.query(sql, [name, email, password, id]);

  return true;
}

async function updateVerificationCode(id, verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
  UPDATE INTO users SET verificationCode = ?, updatedAt = ?, verifiedAt = NULL
   WHERE id = ?`;
  const [user] = await pool.query(sql[(verificationCode, now, id)]);

  return true;
}
module.exports = {
  createUser,
  findUserByEmail,
  activateUser,
  getUserByVerificationCode,
  findAllUsers,
  findUserById,
  uploadUserImage,
  updateUser,
  updateVerificationCode,
};
