const { response } = require('express');
const { validationResult } = require('express-validator');
//le pasas email y pass y le dices cómo validarlos. si NO está vacío, me devuelves un error 400, o sea feedback usuario. 
const validateFields = (req, res = response, next ) => {

    const errores = validationResult( req );

    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
}

module.exports = {
    validateFields
}
