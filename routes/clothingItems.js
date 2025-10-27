const router = require('express').Router();
const {createItem} = require('../controllers/clothingItems');

//CRUD


//Create
router.post("/", createItem);

//Read


//Update

//Delete

module.exports = router;