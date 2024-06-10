import { Op } from 'sequelize';
import Store from '../database/models/Store.js';
import User from '../database/models/User.js';
import Item from "../database/models/Item.js";
import MercadoPagoClient from '../Classes/MercadoPagoClient.js';
import Order from '../database/models/Order.js';
import { emailContact, emailTemplateCancelOrder, emailTemplateCancelOrderTeto, server_mail, server_mail_pass } from '../config/teto.js';

import nodemailer from 'nodemailer';

export const createPaymentLink = async (req, res) => {
  try {
    const client = new MercadoPagoClient();
    const products = req.body.products;
    const address = req.body.address;
    let error = "";
    let request = [];

    if (products[0].stock <= products[0].quantity) {
      return await res.status(500).json({ message: `${products[0].name}: No hay suficientes productos de este item para completar la order` });
    }

    await products.filter(product => product.id === products[0].id).forEach(product => {
      product.stock = product.stock - products[0].quantity;
    });

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
    await products.every(async item => {
      if (item.stock + 1 <= item.quantity) {
        error = `${products[0].name}: No hay suficientes productos de este item para completar la order 2`;
        return false;
      }

      await products.filter(product => product.id === item.id).forEach(product => {
        product.stock = product.stock - item.quantity;
      });

      request = [...request, {
        title: item.name + ' ' + item.color + ' ' + item.size,
        unit_price: parseFloat(item.price.replace(/[^0-9.,-]/g, '')) * 1000,
        quantity: item.quantity,
        currency_id: "COP"
      }];
    });

    if (error) {
      return await res.status(500).json({ message: error });
    }

    // Create the payment link and save it into parent order
    const preference = await client.createPreference(request, parentOrder.id);

    products.forEach(async item => {
      await Order.create({
        delivery_addresss: address,
        rating: item.rating,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        user_id: req.user.id,
        store_id: item.store_id,
        item_id: item.id,
        parent_order_id: parentOrder.id,
        payment_link: preference.init_point
      }, {
        include: User,
        include: Store,
        include: Item,
        include: Order,
      });
    });

    parentOrder.payment_link = preference.init_point;
    parentOrder.save();

    return await res.status(200).json({ payment_link: preference.init_point });
  } catch (error) {
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
          attributes: ['id', 'name', 'colors', 'sizes', 'price', 'photo', 'rating', 'categories', 'stock', 'priority'] // Incluye aquí los atributos que quieras devolver
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
          attributes: ['id', 'name', 'colors', 'sizes', 'price', 'photo', 'rating', 'categories', 'stock', 'priority'] // Incluye aquí los atributos que quieras devolver
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
    await Order.update({ sent_status: true }, {
      where: {
        id: req.body.id,
      },
    });

    await res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
};

export const updateReceived = async (req, res) => {
  try {
    await Order.update({ received_status: true, received_at: Date.now() }, {
      where: {
        id: req.body.id,
      },
    });

    await res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
};

export const updateRefund = async (req, res) => {
  try {
    await Order.update({ received_status: false }, {
      where: {
        id: req.body.id,
      },
    });

    await res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
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


export const deleteOrder = async (req, res) => {

  try {

    // Obtener el ID del producto de la URL de la solicitud
    const { id } = req.params
    // Buscar el producto en la base de datos
    const order = await Order.findByPk(id);
    // Si el producto existe, eliminarlo
    await order.destroy();

    return await res.status(200).json({ message: 'orden eliminada con éxito' });
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
};

export const sendEmailCancelOrder = async (req, res) => {
  const emailReceptor = req.body.recipient_email;
  const nameUser = req.body.nameUser;
  const name = req.body.nameItem;
  const size = req.body.size;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const iduser = req.body.iduser;

  const action = "cancelado"

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: server_mail,
        pass: server_mail_pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailConfigs = {
      from: server_mail,
      to: emailReceptor,
      subject: "Teto: Cancelación de orden",
      html: emailTemplateCancelOrder(nameUser, name, size, quantity, price, action),
    };

    const mailConfigsTeto = {
      from: server_mail,
      to: server_mail,
      subject: "Teto: Cancelación de orden",
      html: emailTemplateCancelOrderTeto(
        nameUser,
        name,
        size,
        quantity,
        price,
        iduser,
        "",
        action
      ),
    };

    // Enviar ambos correos al mismo tiempo
    await Promise.all([
      transporter.sendMail(mailConfigs),
      transporter.sendMail(mailConfigsTeto),
    ]);

    return res.status(200).json({
      message: "Correos enviados con éxito",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};


export const sendEmailRefundOrder = async (req, res) => {
  const emailReceptor = req.body.recipient_email;
  const nameUser = req.body.nameUser;
  const name = req.body.nameItem;
  const size = req.body.size;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const idItem = req.body.id;
  const direccion = req.body.address;
  const iduser = req.body.iduser; // Usuario que pidió el reembolso

  const action = "reembolsado"

  try {
    // Encontrar a qué tienda pertenece el artículo
    const store = await Item.findOne({
      where: {
        id: idItem,
      },
    });

    if (!store) {
      return res.status(404).json({
        error: "No se encontró la tienda asociada al artículo.",
      });
    }

    const store_email = store.email;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: server_mail,
        pass: server_mail_pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mail_configs = {
      from: server_mail,
      to: emailReceptor,
      subject: "Teto: Reembolso de orden",
      html: emailTemplateCancelOrder(nameUser, name, size, quantity, price, action),
    };

    const mail_configs_teto = {
      from: server_mail,
      to: server_mail,
      subject: "Teto: Reembolso de orden",
      html: emailTemplateCancelOrderTeto(
        nameUser,
        name,
        size,
        quantity,
        price,
        iduser,
        direccion,
        action
      ),
    };

    const mail_configs_store = {
      from: server_mail,
      to: store_email,
      subject: "Teto: Reembolso de orden",
      html: emailTemplateCancelOrderTeto(
        nameUser,
        name,
        size,
        quantity,
        price,
        iduser,
        direccion,
        action
      ),
    };

    // Enviar ambos correos al mismo tiempo
    await Promise.all([
      transporter.sendMail(mail_configs),
      transporter.sendMail(mail_configs_teto),
      transporter.sendMail(mail_configs_store)
    ]);


    return res.status(200).json({
      message: "Correos enviado con éxito",
    });
  } catch (err) {
    console.error("Error en la función sendEmailRefundOrder:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const sendEmailContact = async (req, res) => {
  const emailReceptor = req.body.recipient_email;
  const nameUser = req.body.nameUser;
  const message = req.body.message;
  const subject = req.body.subject;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: server_mail,
        pass: server_mail_pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailConfigs = {
      from: server_mail,
      to: server_mail,
      subject: "TETO contacto: Un usuario ha contactado a través de Teto",
      html: emailContact(nameUser, emailReceptor, message, subject),
    };

    // Enviar correo
    await transporter.sendMail(mailConfigs);

    return res.status(200).json({
      message: "Correo enviado con éxito",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}