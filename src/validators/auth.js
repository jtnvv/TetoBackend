import { check } from 'express-validator';
import sequelize from '../database/models/index.js';
import bcrypt from "bcrypt";
import User from '../database/models/User.js';
import Store from '../database/models/Store.js';

//password
const password =check('password').isLength({min:6, max:15}).withMessage('La clave debe tener entre 6 y 15 caracteres');

//email
const email = check('email').isEmail().withMessage('El correo ingresado no es valido');

// existe el email
const emailExists = check('email').custom( async (value) => {
    const { rowCounts } = await sequelize.query("SELECT * FROM users WHERE email=?", {
      replacements: [value],
    });
    
    if (rowCounts) {
      throw new Error("Ya hay una cuenta registrada con ese correo");
    }
});

//login validation
const loginFieldCheck=check('email').custom(async function(value, {req}){
  let user = await User.findOne({where: { email: value}});
  user = !user ? await Store.findOne({where: { email: value}}) : user;

  if(user.rowCounts){
      throw new Error('No existe una cuenta para ese correo')
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    throw new Error("Clave incorrecta");
  }

  req.user = user;

});export const login = async (req,res) => {
  let user=req.user
  let payload={
      id: user.id,
      email: user.email
  }
  try {
      const token = await sign(payload, server.secret)
      return res.status(200).cookie('token',token,{httpOnly:true}).json({
          success:true,
          message: 'login exitoso'
      })       
  } catch (err) {
      console.error(err.message)
      return res.status(500).json({
          error:err.message,
      })
      
  }
}

export const registerValidation = [email, password, emailExists];
export const loginValidation = [loginFieldCheck];

