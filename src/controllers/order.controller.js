import Order from "../database/models/Order.js";
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

      //const orders = await sequelize.query('SELECT * FROM orders')
      
      return await res.status(200).json(orders);
    } catch (error) {
      
      return await res.status(500).json({ message: error.message });
    }
}; 






