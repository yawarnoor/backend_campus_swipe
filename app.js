const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const UserRoute = require("./routes/user.routes");
const TransactionRoute = require("./routes/transaction.routes");
const DeviceRoute = require("./routes/device.routes");
const SubscriptionRoute = require("./routes/subscripton.routes.js");
const CardRoute = require("./routes/card.routes.js");
const EmailRoute = require("./routes/email.routes.js");
const Transaction = require("./models/transaction.model");

const app = express();

app.use(cors());

app.use(bodyParser.json())

function getISOWeek(date) {
    const weekStart = new Date(date.getFullYear(), 0, 4); // ISO 8601 defines the first week of the year as starting on Monday
    weekStart.setDate(weekStart.getDate() - (weekStart.getDay() - 1)); // Move to the start of the week
    const diff = date - weekStart;
    return Math.ceil((diff / 86400000) / 7); // Calculate the week number
  }

app.get('/transactions/day', async (req, res) => {
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
      } catch (error) {
        console.error('Error fetching transactions for the last 15 days:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });


  app.get('/transactions/week', async (req, res) => {
    try {
      // Calculate the date 12 weeks ago
      const twelveWeeksAgo = new Date();
      twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - (7 * 12));
  
      // Generate an array of dates for the last 12 weeks
      const last12WeeksDates = Array.from({ length: 12 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (7 * (11 - index))); // Subtract 7*(11-index) to include the current week
        return date;
      });
  
      // Aggregate transactions for each week within the last 12 weeks
      const last12WeeksTransactions = await Transaction.aggregate([
        {
          $match: {
            date: { $gte: twelveWeeksAgo } // Filter transactions within the last 12 weeks including the current week
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              week: { $isoWeek: '$date' }
            },
            count: { $sum: 1 },
            transactions: { $push: '$$ROOT' } // Store the transactions for each week
          }
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.week': 1
          }
        }
      ]);
  
      // Create a Map to store transactions for each week
      const transactionsMap = new Map();
      last12WeeksTransactions.forEach(week => {
        const { year, week: weekOfYear } = week._id;
        transactionsMap.set(`${year}-W${weekOfYear}`, week);
      });
  
      // Construct the response array with transactions for each week and count = 0 for missing weeks
      const response = last12WeeksDates.map(date => {
        const year = date.getFullYear();
        const weekOfYear = getISOWeek(date); // Function to get ISO week of the year
        const key = `${year}-W${weekOfYear}`;
        const transactionsForWeek = transactionsMap.get(key);
        if (transactionsForWeek) {
          return transactionsForWeek;
        } else {
          return {
            _id: {
              year,
              week: weekOfYear
            },
            count: 0,
            transactions: []
          };
        }
      });
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching transactions for the last 12 weeks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  app.get('/transactions/month', async (req, res) => {
    try {
      // Calculate the date 12 months ago
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
  
  
      // Generate an array of dates for the last 12 months
      const last12MonthsDates = Array.from({ length: 12 }, (_, index) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - index)); // Subtract 11 instead of 12 to include the current month
        return date;
      });

  
      // Aggregate transactions for each month within the last 12 months
      const last12MonthsTransactions = await Transaction.aggregate([
        {
          $match: {
            date: { $gte: twelveMonthsAgo } // Filter transactions within the last 12 months including the current month
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' }
            },
            count: { $sum: 1 },
            transactions: { $push: '$$ROOT' } // Store the transactions for each month
          }
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1
          }
        }
      ]);
  
      // Create a Map to store transactions for each month
      const transactionsMap = new Map();
      last12MonthsTransactions.forEach(month => {
        const { year, month: monthOfYear } = month._id;
        transactionsMap.set(`${year}-${monthOfYear}`, month);
      });
  
  
      // Construct the response array with transactions for each month and count = 0 for missing months
      const response = last12MonthsDates.map(date => {
        const year = date.getFullYear();
        const monthOfYear = date.getMonth() + 1; // Month is zero-based
        const key = `${year}-${monthOfYear}`;
        const transactionsForMonth = transactionsMap.get(key);
        if (transactionsForMonth) {
          return transactionsForMonth;
        } else {
          return {
            _id: {
              year,
              month: monthOfYear
            },
            count: 0,
            transactions: []
          };
        }
      });
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching transactions for the last 12 months:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.use("/",UserRoute);
app.use("/",TransactionRoute);
app.use("/",DeviceRoute);
app.use("/",SubscriptionRoute);
app.use("/",CardRoute);
app.use("/", EmailRoute);


module.exports = app;