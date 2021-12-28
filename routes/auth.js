const { Router } = require('express');
const { medicLogin, patientLogin } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();
//middlewate, antes de llamar al servicio hace validaciones. el check es con el express validator, viene hecho, le pasa una expresiáon regular y comprueba si es válido o no . además comprueba q no esté vacío. comprueba seguridad con un middleware. si todo va bien, pasa  acontrollers.
router.post( '/medic',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    medicLogin
);

router.post( '/patient',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    patientLogin
);

module.exports = router;
