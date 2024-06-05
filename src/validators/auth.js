import { check } from 'express-validator';
import sequelize from '../database/models/index.js';
import bcrypt from "bcrypt";
import User from '../database/models/User.js';
import Store from '../database/models/Store.js';

//password
const password = check('password').isLength({ min: 6, max: 15 }).withMessage('La clave debe tener entre 6 y 15 caracteres');

//email
const email = check('email').isEmail().withMessage('El correo ingresado no es valido');

// existe el email
const emailExists = check('email').custom(async (value) => {
  
  const { rowCounts } = await sequelize.query("SELECT * FROM users WHERE email=?", {
    replacements: [value],
  });
  
  if (rowCounts) {
    
    throw new Error("Ya hay una cuenta registrada con ese correo");
  }
});

//login validation
const loginFieldCheck = check('email').custom(async function (value, { req }) {
  let user = await User.findOne({ where: { email: value } });
  user = !user ? await Store.findOne({ where: { email: value } }) : user;
  
  if (user==null) {
    
    throw new Error('No existe una cuenta para ese correo')
    
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    throw new Error("Clave incorrecta");
  }

  req.user = user;
  req.role = user.role

});

export const registerValidation = [email, password, emailExists];
export const loginValidation = [loginFieldCheck];


