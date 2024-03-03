const{check}=require('express-validator')
const db=require('../db')
const {compare}=require('bcryptjs')

//password
const password =check('password').isLength({min:6, max:15}).withMessage('La clave debe tener entre 6 y 15 caracteres')

//email
const email = check('email').isEmail().withMessage('Ingrese un correo válido')

// existe el email
const emailExists = check('email').custom( async (value) => {
    const{rows}=await db.query('SELECT * FROM users WHERE email= $1',
    [value])
    
    if(rows.length){
        throw new Error('ya hay una cuenta con este correo')
    }
})

//login validation
const loginFieldCheck=check('email').custom(async (value, {req})=>{
    const user =await db.query('SELECT * FROM users WHERE email= $1',
    [value])
    if(!user.rows.length){
        throw new Error('NO existe una cuenta con ese correo')
    }
    
    const validPassword=await compare(req.body.password,user.rows[0].password)
    if(!validPassword){
        throw new Error('la clave no corresponde a ese correo')
    }

    req.user=user.rows[0]

})

module.exports={
    registerValidation:[email,password,emailExists],
    loginValidation: [loginFieldCheck],
}