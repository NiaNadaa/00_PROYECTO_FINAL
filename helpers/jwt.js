const jwt = require('jsonwebtoken');
// esto ejecuta el jwt, crea un objeto con propiedad llamada uid, esto es el id del user, que es único y está en la db, lo pasa y genera un token hasheandolo. el front no puede ver esta llave. cifras el id del user en base al código del jwt y devuelve algo aleatorio. y además que cada vez q logueas es diferentes. esto se guarda en SU SESIÓN, este es su token.
const generateJWT = ( uid ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = {
            uid,
        };
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generateJWT
}