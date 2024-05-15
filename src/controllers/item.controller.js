import Item from "../database/models/Item.js";
import Store from "../database/models/Store.js";
import { categories, colors, sizes } from "../config/teto.js";
import { Op } from 'sequelize';

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
      priority: request.priority ? request.priority : 0
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

export const getCategories = async (req, res) => {
  return await res.status(200).json({ categories: categories });
}

export const getColors = async (req, res) => {
  return await res.status(200).json({ colors: colors });
}

export const getSizes = async (req, res) => {
  return await res.status(200).json({ sizes: sizes });
}

export const getItemsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const items = await Item.findAll({
      where: {
        categories: {
          [Op.contains]: [category],
        },
      },
    });
    return await res.status(200).json(items);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const getItemsById = async (req, res) => {
  try {
    const itemId = req.params.product_id;
    const item = await Item.findOne({
      where: {
        id: itemId,
      },
    });
    const owner = await item.getStore();

    return await res.status(200).json({
      item: item,
      owner: {
        id: owner.id,
        name: owner.name
      }
    });
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const getItemsByPriority = async (req, res) => {
  try {
    const items = await Item.findAll({
      order: [
        ['priority', 'DESC'],
      ],
    });
    return await res.status(200).json(items);
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const addToFavorites = async (req, res) => {
  try {
    const item = await req.user.getItems({
      where: {
        id: req.body.item_id,
      }
    });

    if (Object.keys(item).length === 0) {
      await req.user.addItem(
        await Item.findOne({
          where: {
            id: req.body.item_id,
          }
        })
      );

      return await res.status(201).json({
        message: "Articulo agregado a favoritos"
      });
    } 

    await req.user.removeItem(item);
    
    return await res.status(200).json({
      message : "Articulo removido de favoritos" 
    });
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const isFavorite = async (req, res) => {
  try {
    const item = await req.user.getItems({
      where: {
        id: req.params.item_id,
      }
    });

    if (Object.keys(item).length === 0) {
      return await res.status(200).json({
        message: false
      });
    }

    return await res.status(200).json({
      message: true
    });
  } catch (error) {
    return await res.status(500).json({ message: error.message});
  }
}

export const getFavorites = async (req, res) => {
  try {
    return await res.status(200).json({
      items: await req.user.getItems(),
    });
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}