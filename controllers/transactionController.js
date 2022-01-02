const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const {
    readTransaction,
    saveTransaction,
    createCategoryMapping,
} = require('../model/Transaction');
const { readCategory } = require('../model/Category');

// Create
const createTransaction = async (req, res, next) => {
    try {
        const { payee, amount, date, comment, categoryId } = req.body;

        const newTransaction = {
            id: uuidv4(),
            payee,
            amount,
            date,
            comment: comment ?? '',
            categoryId,
        };

        const oldTransaction = await readTransaction(); // เรียกใช้ fn. readTodo ที่ทไไว้ข้่างบน
        oldTransaction.push(newTransaction);
        await saveTransaction(oldTransaction);

        const x = await readCategory();
        const result = x.filter((item) => item.id === categoryId);
        delete newTransaction.categoryId;
        newTransaction.category = result[0];
        res.status(201).json({ transaction: newTransaction });
    } catch (err) {
        next(err);
    }
};

// Read
const getTransaction = async (req, res, next) => {
    try {
        const result = await readTransaction();
        const categoryMapping = await createCategoryMapping();

        const transactions = result
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map(({ categoryId, ...rest }) => ({
                ...rest,
                category: categoryMapping[categoryId],
            }));

        res.status(200).json({ transactions });
    } catch (err) {
        next(err);
    }
};

// Update
const updateTransaction = async (req, res, next) => {
    try {
        const { payee, amount, date, comment, categoryId } = req.body;
        const { id } = req.params;

        const transactions = await readTransaction();
        const idx = transactions.findIndex((item) => item.id === id);

        if (idx === -1) {
            return res
                .status(400)
                .json({ message: ' transaction with this id not found' });
        }

        transactions[idx] = {
            ...transactions[idx],
            payee: payee ?? transactions[idx].payee,
            amount: amount ?? transactions[idx].amount,
            date: date ?? transactions[idx].date,
            comment: comment ?? transactions[idx].comment,
            categoryId: categoryId ?? transactions[idx].categoryId,
        };

        await saveTransaction(transactions);
        res.json({ transaction: transactions[idx] });
    } catch (err) {
        next(err);
    }
};

// Delete
const deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transactions = await readTransaction();
        const result = transactions.filter((item) => item.id !== id);

        await saveTransaction(result);
        res.status(204).json({ transactions });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};
