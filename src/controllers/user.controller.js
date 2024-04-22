import User from "../database/models/User.js";
import bcrypt from 'bcrypt';
import Store from '../database/models/Store.js';

export const createUser = async (req, res) => {
  try {
    const request = req.body;
    const newUser = await User.create({
      name: request.name,
      last_name: request.last_name,
      email: request.email,
      password: request.password,
      phone_number: request.phone_number,
    });
    await res.status(200).json({ message: "New User created" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
};

export const updatePass = async (req, res) => {
  try {
    const mail = req.body.mail;
    const pass = req.body.pass;

    await User.update({ password: pass }, {
      where: {
        email: mail,
      },
    });

    await res.status(200).json({ message: "password Updated" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  
  try {
    const user = req.user
    const information = await User.findAll({
      where: {
        id: user.id,
      },
    });
    
    return await res.status(200).json(information);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const updateUserInformation = async(req,res) => {

  try {
    const user = req.user

    let updateData = req.body;

    if (await Store.findOne({ where: { email: req.body.email } })){
      
      return res.status(409).json({
          message: "El correo ya se encuentra registrado",
      })
  }

    // Si se envió la contraseña, la hasheamos
    if ('password' in updateData) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }


    const update =   await User.update(updateData, {
        where: {
            id: user.id
        }
    });

    return await res.status(200).json(update);

  } catch (error){
    return await res.status(500).json({ message: error.message });
  }
}