const express = require('express');
const bcrypt = require('bcrypt');
const { users } = require('../config/config');
const app = express();
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


// ================================================
//                      Login
// ================================================

app.post('/login', (req, res) => {
    let body = req.body;
    let emailValid = false;
    let user = new User();

    for(var i = 0 ; i < users.length ; i++){
        if(users[i].email === body.email){
            emailValid = true;
            user = users[i];
        }
    }

    if(!emailValid){
        res.status(400).json({
            ok: false,
            message: `No existe un usuario con el email ${body.email} registrado`
        });
    } else {
        if( !bcrypt.compareSync(body.password, user.password )){
            return res.status(400).json({
                ok: false,
                message: "Password incorrecto"
            });
        }

        let token = jwt.sign(_.pick(user, "id", "name", "email"), process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION_TIME}); // expires in 24 hs
        res.status(200).json({
            ok: true,
            email: body.email,
            user,
            token
        });
    }


});


module.exports= app;