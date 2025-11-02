const ClothingItem = require('../models/clothingItem');

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.status(201).send({data: item});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: "Requested resource not found" });
      } else{
        return res.status(500).send({ message: "Error in createItem" });
      }
    });
}

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error in getItems" });
      });
}

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {$set: { imageUrl }}).orFail()
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: 'Item not found' });
      }
      res.status(200).send({data: item});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      } else if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid item ID' });
      }
      res.status(500).send({ message: "Error in updateItem" });
    });
}

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId).orFail()
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: 'Item not found' });
      }
      res.status(204).send({});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid item ID' });
      }
      res.status(500).send({ message: "Error in deleteItem" });
    });
}

module.exports.createItem = (req, res) => {
  console.log(req.user._id);

}

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};