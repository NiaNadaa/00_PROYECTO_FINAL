const { response } = require('express');
const bcrypt = require('bcryptjs');
const Medic = require('../models/medics');
const Patient = require('../models/patients');
const { generateJWT } = require('../helpers/jwt');
//recupera del body el email y pass, q ya ha sido validada en el formulario del front. es asíncrono porque hay millones que se loguean a la vez, no queremos que el login espere a que se logueen más, que cda petición se ejecute paralela, que s epuedan recibir muchas simultaneamente y se ejecuten a la vez. procesos simultáneos.
// si el email existe, hace bcrypt y compara.
const medicLogin = async( req, res = response ) => {
    const { email, password } = req.body;
    try {

        const medicDB = await Medic.findOne({ email });
        if ( !medicDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }

        const validPassword = bcrypt.compareSync( password, medicDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }

        const token = await generateJWT( medicDB.id );

        setTimeout(function() {
            res.json({
                ok: true,
                uid: medicDB.id,
                token,
                role: medicDB.role,
                email: medicDB.email,
                name: medicDB.name,
                surname: medicDB.surname,
                address: medicDB.address,
                province: medicDB.province,
                gender: medicDB.gender,
                menu: buildMenu(medicDB.role),
            });
        }, 1000);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servicio'
        });
    }
}
//además le devuelves el menú en base al rol. si es medico devuelve unas cosas y sino otrás.
const patientLogin = async( req, res = response ) => {
    const { email, password } = req.body;
    try {

        const patientDB = await Patient.findOne({ email });
        if ( !patientDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }

        const validPassword = bcrypt.compareSync( password, patientDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }

        const token = await generateJWT( patientDB.id );

        setTimeout(function() {
            res.json({
                ok: true,
                uid: patientDB.id,
                token,
                email: patientDB.email,
                role: patientDB.role,
                name: patientDB.name,
                surname: patientDB.surname,
                address: patientDB.address,
                province: patientDB.province,
                gender: patientDB.gender,
                medicAssigned: patientDB.medicAssigned,
                appointment: patientDB.appointment,
                menu: buildMenu(patientDB.role),
            });
        }, 1000);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servicio'
        });
    }
}

function buildMenu(ROLE) {
    const ADMIN_MENU = [
        { title: 'Dashboard', url:'/dashboard' },
        { title: 'Perfil', url:'/perfil' },
        { title: 'Pacientes', url:'/pacientes' },
        { title: 'Consultar citas', url:'/consultar-citas' }
    ]

    const USER_MENU = [
        { title: 'Dashboard', url:'/dashboard' },
        { title: 'Perfil', url:'/perfil' },
        { title: 'Asignar médico', url:'/asignar-medico' },
        { title: 'Solicitar cita', url:'/solicitar-cita' }
    ]
    return ROLE === 'ADMIN' ? ADMIN_MENU : USER_MENU;
}

module.exports = {
    medicLogin,
    patientLogin
}