const fs = require('fs');

function readDatabase() {
    try {
        const data = fs.readFileSync('./db.txt', 'utf8');
        if (data) {
            // Parse the JSON string to an object
            return JSON.parse(data);
        }
        return {};
    } catch (error) {
        console.error('Error reading from db.txt:', error);
        return {};
    }
}

function writeDatabase(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync('./db.txt', jsonData, 'utf8');
    } catch (error) {
        console.error('Error writing to db.txt:', error);
    }
}

module.exports = {
    readDatabase,
    writeDatabase
};
