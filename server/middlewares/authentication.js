const jwt = require('jsonwebtoken');

// ================================================
//              Token Velification
// ================================================

let tokenVerify = (req, res, next) =>{
    let token = req.get('token');

    jwt.verify( token, process.env.SECRET, (err, decoded) => {
        if( err){
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};





module.exports = {
    tokenVerify
}