const router = require("express").Router();
const TransactionController = require('../controller/transaction.controller');

router.get("/transactions",TransactionController.get_transactions);

router.post("/transactions",TransactionController.post_transactions);


module.exports = router;