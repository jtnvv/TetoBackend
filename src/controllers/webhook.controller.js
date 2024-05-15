import MercadoPagoClient from "../Classes/MercadoPagoClient.js";

export const getMercadoPagoPayment = async (req, res) => {
    try {
        const client = new MercadoPagoClient();
        client.confirmPayment(req.body.data.id);
        

        await res.status(200).json({ payment_link: "Test" });
    } catch (error) {
        await res.status(500).json({ message: error.message });
    }
};

