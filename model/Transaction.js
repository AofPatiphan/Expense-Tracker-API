const fs = require('fs/promises');

// Read file
const readTransaction = async () => {
    const data = await fs.readFile('transaction.json', 'utf-8');
    return JSON.parse(data);
};

const readCategory = async () => {
    const data = await fs.readFile('category.json', 'utf-8');
    return JSON.parse(data);
};

createCategoryMapping = async () => {
    const categories = await readCategory();
    return categories.reduce((acc, el) => {
        if (!acc[el.id]) {
            acc[el.id] = el;
        }
        return acc;
    }, {});
};

// Save file
const saveTransaction = (data) =>
    fs.writeFile('transaction.json', JSON.stringify(data));

module.exports = {
    readTransaction,
    readCategory,
    createCategoryMapping,
    saveTransaction,
};
