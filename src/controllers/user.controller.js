import User from "../database/models/User";

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