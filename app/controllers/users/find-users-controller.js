'use strict';

const createJsonError = require('../../errors/createJsonError');
const throwJsonError = require('../../errors/throw-json-error');
const { findAllUsers } = require('../../repositories/users-repository')

async function getUser(req, res) {
    try {
        const { role } = req.auth
        if (role !== 'admin') {
            throwJsonError(401, 'No tiene permiso para realizar esa acción')
        }
        const users = await findAllUsers()

        res.status(200)
        res.send({ data: users })
    } catch (error) {
        createJsonError(error, res)
    }
}
module.exports = getUser;