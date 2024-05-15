
import Store from '../database/models/Store.js';
import User from '../database/models/User.js';
import Item from "../database/models/Item.js";
import Sequelize from "../database/models/index.js";




export const fetchUserOrders = async (req, res) => {
    
    try {

     
      
      const userToken = req.user
      const user = await User.findByPk(userToken.id);
      
      // Obtener todas las órdenes de ese usuario
      const orders = await user.getOrders({
        include: [
          {
            model: Item,
            through: { attributes: [] } // Esto excluye los atributos de la tabla de unión
          }
        ]
      });

  
      
      return await res.status(200).json(orders);
    } catch (error) {
      
      return await res.status(500).json({ message: error.message });
    }
}; 

export const fetchBrandOrders = async (req, res) => {
    
  try {

    const userToken = req.user
    const store = await Store.findByPk(userToken.id);
    
    // Obtener todas las órdenes de ese usuario
    const orders = await store.getOrders({
      include: [
        {
          model: Item,
          through: { attributes: [] } // Esto excluye los atributos de la tabla de unión
        }
      ]
    });


    
    return await res.status(200).json(orders);
  } catch (error) {
    
    return await res.status(500).json({ message: error.message });
  }
}; 

export const updateSend = async (req, res) => {
  try {
    const sid = req.body.id;

    await User.update({ sent_status: TRUE }, {
      where: {
        id: sid,
      },
    });

    await res.status(200).json({ message: "status Updated" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
};




