const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');
const {BAD_REQUEST_ERROR_CODE, SERVER_ERROR_CODE, NOT_FOUND_ERROR_CODE} = require('../utils/errors');

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
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Requested resource not found" });
      } else{
        return res.status(SERVER_ERROR_CODE).send({ message: "Error in createItem" });
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
      res.status(SERVER_ERROR_CODE).send({ message: "Error in getItems" });
      });
}

/* const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { weather, imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {weather, $set: { imageUrl }}).orFail()
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Item not found' });
      }
      res.status(200).send({data: item});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else if (err.name === 'CastError') {
        return res.status(CAST_ERROR_CODE).send({ message: 'Invalid item ID' });
      }
      res.status(SERVER_ERROR_CODE).send({ message: "Error in updateItem" });
    });
} */

const likeItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  if(!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Invalid item ID' });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  ).orFail()
    .then((like) => res.status(201).send({data: like}))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Invalid item ID' });
      } else if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Item not found' });
      }
      res.status(SERVER_ERROR_CODE).send({ message: "Error in likeItem" });
    });
}

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  if(!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Invalid item ID' });
  }

 return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  ).orFail()
    .then((dislike) => res.status(200).send({data: dislike}))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Invalid item ID' });
      }
      res.status(SERVER_ERROR_CODE).send({ message: "Error in dislikeItem" });
    });
}

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId).orFail()
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Item not found' });
      }
      res.status(204).send({});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Invalid item ID' });
      } else if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Item not found' });
      }
      res.status(SERVER_ERROR_CODE).send({ message: "Error in deleteItem" });
    });
}

/* module.exports.createItem = (req, res) => {
  console.log(req.user_id);
};

module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },
);

module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
) */

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
};