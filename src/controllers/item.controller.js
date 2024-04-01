import Item from "../database/models/Item.js";
import Store from "../database/models/Store.js";
import { categories } from "../config/teto.js";

export const getItem = async (req, res) => {
  await res.send("Item 1");
};

export const createItem = async (req, res) => {
  try {
    const request = req.body;
    const store = req.user;
    request.categories.every((category) => {
      if (!categories.includes(category)) {
        return res.status(422).json({
          message: category + " no es una categoria valida"
        });
      }
    });

    await Item.create({
      name: request.name,
      colors: request.colors,
      colors_available: request.colors_available,
      sizes: request.sizes,
      sizes_available: request.sizes_available,
      price: request.price,
      photo: request.photo,
      categories: request.categories,
      stock: request.stock,
      store_id: store.id,
    },
      {
        include: Store,
      });

    return await res.status(200).json({ message: "Nuevo elemento creado" });
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
};

export const getItemsByStore = async (req, res) => {
  try {
    const store_id = req.params.store_id;
    const items = await Item.findAll({
      where: {
        store_id: store_id,
      },
    });
    return await res.status(200).json(items);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}