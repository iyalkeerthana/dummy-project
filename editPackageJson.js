const fs = require('fs');
const path = './package.json';

fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading package.json:', err);
        return;
    }

    try {
        const json = JSON.parse(data);
        if (json.scripts && json.scripts.postinstall) {
            json.scripts.postinstall = json.scripts.postinstall.replace(/ && bash scripts\/temp-xcconfig.sh/, '');
        }

        fs.writeFile(path, JSON.stringify(json, null, 2), 'utf8', (err) => {
            if (err) console.error('Error writing package.json:', err);
            else console.log('package.json has been updated successfully.');
        });
    } catch (err) {
        console.error('Error parsing JSON string:', err);
    }
});

