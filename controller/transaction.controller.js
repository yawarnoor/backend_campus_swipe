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

exports.day_transactions = async (req, res, next) => {
    try {
        // Calculate the date 15 days ago
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    
        // Generate an array of dates for the last 15 days
        const last15DaysDates = Array.from({ length: 15 }, (_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (14 - index));
          return date;
        });
    
        // Aggregate transactions for each day within the last 15 days
        const last15DaysTransactions = await Transaction.aggregate([
          {
            $match: {
              date: { $gte: fifteenDaysAgo } // Filter transactions within the last 15 days
            }
          },
          {
            $group: {
              _id: {
                year: { $year: '$date' },
                month: { $month: '$date' },
                day: { $dayOfMonth: '$date' }
              },
              count: { $sum: 1 },
              transactions: { $push: '$$ROOT' } // Store the transactions for each day
            }
          },
          {
            $sort: {
              '_id.year': 1,
              '_id.month': 1,
              '_id.day': 1
            }
          }
        ]);
    
        // Create a Map to store transactions for each day
        const transactionsMap = new Map();
        last15DaysTransactions.forEach(day => {
          const { year, month, day: dayOfMonth } = day._id;
          transactionsMap.set(`${year}-${month}-${dayOfMonth}`, day);
        });
    
        // Construct the response array with transactions for each day and count = 0 for missing days
        const response = last15DaysDates.map(date => {
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Month is zero-based
          const dayOfMonth = date.getDate();
          const key = `${year}-${month}-${dayOfMonth}`;
          const transactionsForDay = transactionsMap.get(key);
          if (transactionsForDay) {
            return transactionsForDay;
          } else {
            return {
              _id: {
                year,
                month,
                day: dayOfMonth
              },
              count: 0,
              transactions: []
            };
          }
        });
    
        res.json(response);
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
