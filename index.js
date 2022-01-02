const express = require('express');
const cors = require('cors');

const categoryRouter = require('./routes/categoryRoute');
const transactionRouter = require('./routes/transactionRoute');
const app = express();

//เอา body มาใช้
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Category
app.use('/categories', categoryRouter);

// Transaction
app.use('/transactions', transactionRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

//Handle error
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message });
});

app.listen(2022, () => console.log('Server is running on port 2022'));
