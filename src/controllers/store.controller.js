import Store from '../database/models/Store.js';

export const getStore = async (req, res) => {
  await res.send("Store 1");
};

export const createStore = async (req, res) => {
  try {
    const request = req.body;
    await Store.create({
      name: request.name,
      city: request.city,
      email: request.email,
      password: request.password,
      phone_number: request.phone_number,
      description: request.description,
      logo: request.logo,
    });
    await res.status(200).json({ message: "New Store created" });
  } catch (error) {
    await res.status(500).json({ message: error.message })
  }
};

export const getStoreById = async (req, res) => {
  try {
    const store_id = req.params.store_id;
    const store = await Store.findByPk(store_id);
    return await res.status(200).json(store);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}