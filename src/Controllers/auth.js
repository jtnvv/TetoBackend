const {encrypt, compare} = require('../Helpers/handleBcrypt')


//registramos un usuario
const registerCtrl = async(req, res) => {
    try {
        const {name, email, password} = req.body
        const passwordHash = await encrypt(password) //Encriptando la clave
        
        //Registrar Usuario en la BD. *No creada aun*
    }catch (e){

    }
}