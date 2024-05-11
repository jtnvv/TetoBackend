import { Preference, MercadoPagoConfig } from "mercadopago";
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

    // confirmPayment(request) {
    //     const preference = new Preference(this.client);

    //     return preference.create({
    //         body: {
    //             items: {
    //                 title: request.title,
    //                 unit_price: request.unit_price,
    //                 quantity: request.quantity
    //             },
    //             external_reference: request.external_reference
    //         }
    //     });
    // }
}

export default MercadoPagoClient;