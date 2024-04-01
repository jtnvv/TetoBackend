import Store from '../database/models/Store.js';

export const getStore = async (req, res) => {
  await res.send("Store 1");
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

export const getStores = async (req, res) => {
  
  try {
    
    const stores = await Store.findAll();
    
    return await res.status(200).json(stores);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}