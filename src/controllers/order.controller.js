
import Store from '../database/models/Store.js';
import User from '../database/models/User.js';
import Item from "../database/models/Item.js";
import MercadoPagoClient from '../Classes/MercadoPagoClient.js';
import Order from '../database/models/Order.js';

export const createPaymentLink = async (req, res) => {
  try {
    const client = new MercadoPagoClient();
    const products = req.body.products;
    const address = req.body.address;
    let request = [];
    
    // Create parent_order
    const parentOrder = await Order.create({
      delivery_addresss: address,
      rating: products[0].rating,
      color: products[0].color,
      size: products[0].size,
      user_id: req.user.id,
      store_id: products[0].store_id,
      item_id: products[0].id,
    },{
      include: User,
      include: Store,
      include: Item,
    });

    request = [...request, {
      title: products[0].name,
      unit_price: parseFloat(products[0].price.replace(/[^0-9.,-]/g, '')) * 1000,
      quantity: products[0].quantity,
      currency_id: "COP"
    }];

    // Remove parent order from products collection
    products.splice(0, 1);

    // Add child products to the parent order and to the request array
    products.forEach(async item => {
      await Order.create({
        delivery_addresss: address,
        rating: item.rating,
        color: item.color,
        size: item.size,
        user_id: req.user.id,
        store_id: item.store_id,
        item_id: item.id,
        parent_order_id: parentOrder.id
      }, {
        include: User,
        include: Store,
        include: Item,
        include: Order,
      });

      request = [...request, {
        title: item.name,
        unit_price: parseFloat(item.price.replace(/[^0-9.,-]/g, '')) * 1000,
        quantity: item.quantity,
        currency_id: "COP"
      }];
    });

    // Create the payment link and save it into parent order
    const preference = await client.createPreference(request, parentOrder.id);
    parentOrder.payment_link = preference.init_point;
    parentOrder.save();

    return await res.status(200).json({ payment_link: preference.init_point });
  } catch (error) {
    console.log('ERROR', error.message);
    return await res.status(500).json({ message: error.message });
  }
};

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





