import { Op } from 'sequelize';
import Store from '../database/models/Store.js';
import User from '../database/models/User.js';
import Item from "../database/models/Item.js";
import MercadoPagoClient from '../Classes/MercadoPagoClient.js';
import Order from '../database/models/Order.js';
import { body } from 'express-validator';

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
      quantity: products[0].quantity,
      user_id: req.user.id,
      store_id: products[0].store_id,
      item_id: products[0].id,
    }, {
      include: User,
      include: Store,
      include: Item,
    });

    request = [...request, {
      title: products[0].name + ' ' + products[0].color + ' ' + products[0].size,
      unit_price: parseFloat(products[0].price.replace(/[^0-9.,-]/g, '')) * 1000,
      quantity: products[0].quantity,
      currency_id: "COP"
    }];

    // Remove parent order from products collection
    products.splice(0, 1);

    // Add child products to the parent order and to the request array
    products.forEach(async item => {
      request = [...request, {
        title: item.name + ' ' + item.color + ' ' + item.size,
        unit_price: parseFloat(item.price.replace(/[^0-9.,-]/g, '')) * 1000,
        quantity: item.quantity,
        currency_id: "COP"
      }];

      await Order.create({
        delivery_addresss: address,
        rating: item.rating,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
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
    const userId = req.user.id; //  ID de la tienda está en req.user.id

    // Buscar en la tabla de órdenes por la ID de la tienda
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Item,
          as: 'item', // Esto debe coincidir con cómo has definido la asociación en tus modelos
          attributes: ['name', 'colors', 'sizes', 'price', 'photo', 'rating', 'categories', 'stock', 'priority'] // Incluye aquí los atributos que quieras devolver
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
    const storeId = req.user.id; //  ID de la tienda está en req.user.id

    // Buscar en la tabla de órdenes por la ID de la tienda
    const orders = await Order.findAll({
      where: { store_id: storeId },
      include: [
        {
          model: Item,
          as: 'item', // Esto debe coincidir con cómo has definido la asociación en tus modelos
          attributes: ['name', 'colors', 'sizes', 'price', 'photo', 'rating', 'categories', 'stock', 'priority'] // Incluye aquí los atributos que quieras devolver
        }
      ]
    });

    return await res.status(200).json(orders);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
};

export const updateOrderRating = async (req, res) => {
  try {
    const id = req.body.id; // ID de la orden
    const rating = req.body.rating; // Nuevo rating

    // Buscar la orden por ID
    const order = await Order.findByPk(id);

    // Si la orden no existe, devolver un error
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Actualizar el rating de la orden
    order.rating = rating;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const itemRating = async (req, res) => {
  try {
    const id = req.body.id;
    // Buscar el item por ID
    const item = await Item.findByPk(id);
    const orders_by_item = await item.getOrders({
      where: { rating: { [Op.gt]: 0 } }
    })

    const average = orders_by_item.reduce((acc, order) => {
      return acc + order.rating;
    }, 0) / orders_by_item.length;
    // Si el item no existe, devolver un error
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Actualizar el rating del item
    item.rating = parseInt(average);
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

