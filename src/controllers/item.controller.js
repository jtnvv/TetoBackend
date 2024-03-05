import Item from "../database/models/Item.js";
import Store from "../database/models/Store.js";

export const getItem = async (req, res) => {
  await res.send("Item 1");
};

export const createItem = async (req, res) => {
  try {
    const request = req.body;
    const newItem = await Item.create(
      {
        name: request.name,
        colors: request.colors,
        colors_available: request.colors_available,
        sizes: request.sizes,
        sizes_available: request.sizes_available,
        photo: request.photo,
        category: request.category,
        store_id: request.store_id,
      },
      {
        include: [Store],
      }
    );
    await res.status(200).json({ message: "New Item created" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
};
