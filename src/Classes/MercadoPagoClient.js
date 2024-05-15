import { Preference, MercadoPagoConfig, Payment } from "mercadopago";
import { mercadopago } from "../config/teto.js";

class MercadoPagoClient {

    constructor() {
        try {
            this.client = new MercadoPagoConfig({
                accessToken: mercadopago.access_token
            });
        } catch (error) {
            throw error.message;
        }
    }

    createPreference(request, external_reference){
        try {
            const preference = new Preference(this.client);

            return preference.create({
                body: {
                    items: request,
                    external_reference: external_reference
                }
            });
        } catch (error) {
            console.log(error);
            throw error.message;
        }
    }

    confirmPayment(payment_id) {
        const payment = new Payment(this.client);

        return payment.get({
            id: payment_id
        });
    }
}

export default MercadoPagoClient;