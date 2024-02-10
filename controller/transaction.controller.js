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
    // catch (error) {
    //     console.error('Error saving transaction:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }
}

exports.get_transactions = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const transactions = await TransactionServices.getAllTransactions();
        res.status(200).json(transactions);
    }
    //  catch (error) {
    //     console.error('Error retrieving transactions:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }
    catch (err) {
    console.log("---> err -->", err);
    next(err);
}
}
