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
        return res.status(400).send({ message: err.message });
      } else{
        return res.status(500).send({ message: err.message });
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
      res.status(500).send({ message: err.message });
      });
}

module.exports = {
  createItem,
  getItems,
};