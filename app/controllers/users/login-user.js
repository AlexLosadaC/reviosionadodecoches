'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt =require ('jsonwebtoken')
const createJsonError = require('../../errors/create-json-errors')
const throwJsonError = require('../../errors/throw-json-error')
const schema= Joi.object().keys({
    username: Joi.string().email().required(), 
    password: Joi.string().min(4).max(20).required(),
})
async function loginUser(req, res){
    try {
        const { body } =req;

        await schema.validateAsync(body);

        const {username, password} = body;
        const user = await getUserByEmail(username);
        if (!user) {
            throwJsonError(403, 'No existe un usuario con ese email y/o password')
        }
        
        const { id, name, role, password: passwordHash, verifiedAt } = user;
        const isValidPassword = await bcrypt.compare(passwordHash, password);
        if (!isValidPassword) {
            throwJsonError(403, 'No existe un usuario con ese email y/o password')
        }
        if (!verifiedAt) {
            throwJsonError(403, 'Verifique su cuenta, por favor')
        }
        const { JWT_SECRET }=process.env;
        const tokenPayLoad = {id, name, role}
        const token = jwt.sign(
        tokenPayLoad,
        JWT_Secret,
        {expiresIn: '20m'},
        )

        const response={
            accessToken: token,
            expiresin: '20m'
        }

        res.status(200)
        res.send(response)


    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = loginUser