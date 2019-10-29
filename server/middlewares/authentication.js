const jwt = require('jsonwebtoken');

// ================================================
//              Token Velification
// ================================================

let user;

let tokenVerify = (req, res, next) =>{
    let token = req.get('token');

    jwt.verify( token, process.env.SECRET, (err, payload) => {
        if( err){
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.user = payload;
        user = payload;
        next();
    });
};


let verifyAdmin_Token = (req, res, next) => {

    if(user.role !=="admin") return res.status(401).json({
        ok:false,
        err: {
            message: "No tiene los privilegios de administrador para realizar la tarea"
        }
    });

    next();
};




module.exports = {
    tokenVerify,
    verifyAdmin_Token
}