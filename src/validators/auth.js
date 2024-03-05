import { check } from 'express-validator';
import sequelize from '../database/models/index.js';
import bcrypt from "bcrypt";
import User from '../database/models/User.js';

//password
const password =check('password').isLength({min:6, max:15}).withMessage('La clave debe tener entre 6 y 15 caracteres');

//email
const email = check('email').isEmail().withMessage('Ingrese un correo válido');

// existe el email
const emailExists = check('email').custom( async (value) => {
    const { rowCounts } = await sequelize.query("SELECT * FROM users WHERE email=?", {
      replacements: [value],
    });
    
    if (rowCounts) {
      throw new Error("ya hay una cuenta con este correo");
    }
});

//login validation
const loginFieldCheck=check('email').custom(async function(value, {req}){
  const user = await User.findOne({where: { email: value}});

  if(user.rowCounts){
      throw new Error('NO existe una cuenta con ese correo')
  }

  console.log(user.password);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    throw new Error("la clave no corresponde a ese correo");
  }

  req.user = user;

});

export const registerValidation = [email, password, emailExists];
export const loginValidation = [loginFieldCheck];

