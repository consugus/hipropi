const bcrypt = require('bcrypt');

// ================================================
//                    Port
// ================================================
process.env.PORT = process.env.PORT || 3000;


// ================================================
//                  JsonWebToken
// ================================================
process.env.TOKEN_EXPIRATION_TIME = '30d';                          // Expires in 30 days
process.env.SECRET = process.env.SECRET || "EurekaLabsChallenge";


// ================================================
//        User Data (for testing purpose)
// ================================================
let user = {
    id: "007",
    name: "Gustavo",
    email: "consugus@gmail.com",
    role: 'admin',
    password: bcrypt.hashSync( "123456", 10 )
};

let users = [];
users.push(user);

user = {
    id: "008",
    name: "Consuelo",
    email: "consucardona@gmail.com",
    role: 'user',
    password: bcrypt.hashSync( "123456", 10 )
};
users.push(user);


module.exports = { users };
