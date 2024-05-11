export const getMercadoPagoPayment = async (req, res) => {
    try {
        await res.status(200).json({ payment_link: "Test" });
    } catch (error) {
        await res.status(500).json({ message: error.message });
    }
};

