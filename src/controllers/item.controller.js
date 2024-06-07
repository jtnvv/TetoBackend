import Item from "../database/models/Item.js";
import Store from "../database/models/Store.js";
import { categories, colors, sizes } from "../config/teto.js";
import { Op } from 'sequelize';

function containsOnlyDigits(str) {
  return /^\d+$/.test(str);
}

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

    request.colors.every((color) => {
      if (!colors.includes(color)) {
        return res.status(422).json({
          message: color + " no es un color valido"
        });
      }
    });

    request.sizes.every((size) => {
      if (!sizes.includes(size)) {
        return res.status(422).json({
          message: size + " no es una talla valida"
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
    // Obtener todos los ítems
    const items = await Item.findAll();

    // Separar ítems por prioridad
    const priorityItems = items.filter(item => item.priority);
    const nonPriorityItems = items.filter(item => !item.priority);

    // Función para mezclar aleatoriamente un arreglo
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    // Mezclar ambos arreglos de ítems
    shuffleArray(priorityItems);
    shuffleArray(nonPriorityItems);

    // Combinar los ítems priorizados con los no priorizados
    const randomizedItems = [...priorityItems, ...nonPriorityItems];

    // Devolver los ítems mezclados
    return res.status(200).json(randomizedItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


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

export const updateItem = async (req, res) => {
  try {
    const item = await req.user.getItems({
      where: {
        id: req.body.item_id
      }
    });

    item[0].price = req.body.price ? req.body.price : item[0].price;
    item[0].stock = req.body.stock;
    item[0].categories = req.body.categories ? req.body.categories.categories : item[0].categories;
    item[0].sizes = req.body.sizes ? req.body.sizes.sizes : item[0].sizes;
    item[0].colors = req.body.colors ? req.body.colors.colors : item[0].colors;

    if (!containsOnlyDigits(item[0].price)) {
      return await res.status(500).json({ message: "Ingresa un formato de precio valido" });
    }

    item[0].categories.every((category) => {
      if (!categories.includes(category)) {
        return res.status(422).json({
          message: category + " no es una categoria valida"
        });
      }
    });

    item[0].colors.every((color) => {
      if (!colors.includes(color)) {
        return res.status(422).json({
          message: color + " no es un color valido"
        });
      }
    });

    item[0].sizes.every((size) => {
      if (!sizes.includes(size)) {
        return res.status(422).json({
          message: size + " no es una talla valida"
        });
      }
    });

    await item[0].save();

    return await res.status(200).json({
      message: 'Producto actualizado correctamente',
    });
  } catch (error) {
    return await res.status(500).json({ message: error.message });
  }
}

export const isOwner = async (req, res) => {
  try {
    const item = await req.user.getItems({
      where: {
        id: req.params.item_id,
      }
    });

    const isOwner = Object.keys(item).length === 0 ? false : true;

    return await res.status(200).json({
      message: isOwner,
    });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ message: error.message });
  }
}

export const getRelated = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: {
        id: req.params.item_id,
      }
    });
    const relatedItems = await Item.findAll({
      where: [{
        categories: { [Op.contains] : [item.categories[0]]},
      },{
        id: { [Op.ne]: item.id },
      }],
      limit: 10
    });

    return await res.status(200).json({
      products: relatedItems,
    });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ message: error.message });
  }
}

