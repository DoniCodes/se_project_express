const router = require('express').Router();
const {createItem, getItems, likeItem, dislikeItem, deleteItem} = require('../controllers/clothingItems');

router.get("/", getItems);

router.post("/", createItem);

/* router.put("/:itemId", updateItem); */
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;