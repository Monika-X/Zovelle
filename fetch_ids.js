const https = require('https');
const fs = require('fs');

const query = 'fashion';
const url = `https://unsplash.com/napi/search/photos?query=${query}&per_page=30`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const ids = json.results.map(img => img.id);
      fs.writeFileSync('unsplash_ids.json', JSON.stringify(ids, null, 2));
      console.log('Saved ' + ids.length + ' IDs');
    } catch (e) {
      console.error('Error parsing JSON');
    }
  });
}).on('error', err => {
  console.error(err.message);
});
