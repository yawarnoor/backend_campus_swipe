const router = require("express").Router();
const CardController = require('../controller/card.controller');

router.get("/cards",CardController.get_cards);

router.post("/cards",CardController.post_cards);


module.exports = router;