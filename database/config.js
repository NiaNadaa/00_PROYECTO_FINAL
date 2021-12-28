const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// conexción con mongo, no entiendo, funciona, 
const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}

module.exports = {
    dbConnection
}