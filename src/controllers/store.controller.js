import Store from '../database/models/Store.js';
import User from '../database/models/User.js';
import Item from "../database/models/Item.js";
import bcrypt from 'bcrypt';


export const getStore = async (req, res) => {
  await res.send("Store 1");
};

export const getStoreById = async (req, res) => {
  try {
    const store_id = req.params.store_id;
    const store = await Store.findByPk(store_id);
    return await res.status(200).json(store);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const getStoreProfile = async (req, res) => {
  
  try {
    const store = req.user
    const information = await Store.findAll({
      where: {
        id: store.id,
      },
    });
    
    return await res.status(200).json(information);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const updateStoreInformation = async(req,res) => {

  try {
    const store = req.user
    let updateData = req.body;

    if (await User.findOne({ where: { email: req.body.email } })) {
      
      return res.status(409).json({
          message: "El correo ya se encuentra registrado",
      })
    }


    // Si se envió la contraseña, la hasheamos
    if ('password' in updateData) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }


    const update =   await Store.update(updateData, {
        where: {
            id: store.id
        }
    });

    return await res.status(200).json(update);

  } catch (error){
    return await res.status(500).json({ message: error.message });
  }
}

export const getStores = async (req, res) => {

  try {

    const stores = await Store.findAll();

    return await res.status(200).json(stores);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const deleteItemBrand = async (req, res) => {

  try {
    
    // Obtener el ID del producto de la URL de la solicitud
    const { id } = req.params
    // Buscar el producto en la base de datos
    const item = await Item.findByPk(id);
    // Si el producto existe, eliminarlo
    await item.destroy();

    return await res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}