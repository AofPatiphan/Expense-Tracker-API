const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const { saveCategory, readCategory } = require('../model/Category');

// Create
const createCategory = async (req, res, next) => {
    try {
        const { name, type } = req.body;

        const newCategory = {
            id: uuidv4(),
            name,
            type,
        };
        const oldCategory = await readCategory(); // เรียกใช้ fn. readTodo ที่ทไไว้ข้่างบน
        oldCategory.push(newCategory);
        await saveCategory(oldCategory);
        res.status(201).json({ todo: newCategory });
    } catch (err) {
        next(err);
    }
};

// Read
const getCategory = async (req, res, next) => {
    try {
        const categories = await readCategory();
        res.json({ categories });
    } catch (err) {
        next(err);
    }
};

// Update
const updateCategory = async (req, res, next) => {
    try {
        const { name, type } = req.body;
        const { id } = req.params;

        const categories = await readCategory();
        const idx = categories.findIndex((item) => item.id === id);

        if (idx === -1) {
            return res
                .status(400)
                .json({ message: ' category with this id not found' });
        }

        categories[idx] = {
            ...categories[idx],
            name: name ?? categories[idx].name,
            type: type ?? categories[idx].type,
        };

        await saveCategory(categories);
        res.json({ category: categories[idx] });
    } catch (err) {
        next(err);
    }
};

// Delete
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categories = await readCategory();
        const result = categories.filter((item) => item.id !== id);

        await saveCategory(result);
        res.status(204).json({ categories });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
