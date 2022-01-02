const express = require('express');
const {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
