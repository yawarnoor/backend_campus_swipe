const TransactionServices = require('../services/transaction.service');

exports.post_transactions = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { cms_id, status, device_id } = req.body;
        const add = await TransactionServices.addTransaction(cms_id, device_id, status)

        res.json({ status: true, success: 'Transaction Added successfully' });

    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.get_transactions = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const transactions = await TransactionServices.getAllTransactions();
        res.status(200).json(transactions);
    }
    catch (err) {
    console.log("---> err -->", err);
    next(err);
}
}

exports.transactions_id = async (req, res, next) => {


    try {
        const cms_id = req.params.id;

        const users = await TransactionServices.getTransactionsByCMS(cms_id);
        res.status(200).json(users);
    }
    catch (err) {
    console.log("---> err -->", err);
    next(err);
}
}
