const fs = require('fs/promises');

// Read file
const readCategory = async () => {
    const data = await fs.readFile('category.json', 'utf-8');
    return JSON.parse(data);
};

// Save file
const saveCategory = (data) =>
    fs.writeFile('category.json', JSON.stringify(data)); //return เป็น promise เสมอ เลยไม่ต้องใส่ async/ await

module.exports = { readCategory, saveCategory };
