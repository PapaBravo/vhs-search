const axios = require('../node_modules/axios');
const index = require('./build_index.json');

async function uploadIndex(index) {
    try {
        const res = await axios.put('http://localhost:9200/vhs', index, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

uploadIndex(index);