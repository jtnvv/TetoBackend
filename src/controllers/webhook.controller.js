import MercadoPagoClient from "../Classes/MercadoPagoClient.js";
import Order from '../database/models/Order.js';
import { Op } from 'sequelize';

export const getMercadoPagoPayment = async (req, res) => {
    try {
        const client = new MercadoPagoClient();
        const payment = await client.confirmPayment(req.body.data.id);

        if(payment.status === 'approved') {
            const orders = await Order.findAll({
                where: {
                    [Op.or]: {
                        id: payment.external_reference,
                        parent_order_id: payment.external_reference
                    }
                }
            });

            orders.forEach(async (order) => {
                order.sent_status = false;
                order.received_status = false;
                order.payment_id = req.body.data.id;
                order.payment_link = null;
                order.save();

                const item = order.getItem();
                item.stock = item.stock - 1;
                item.save();
            });
        }

        await res.status(200).json({ message: "Request received successfully" });
    } catch (error) {
        await res.status(500).json({ message: error.message });
    }
};

