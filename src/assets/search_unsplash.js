import https from 'https';

const url = 'https://unsplash.com/s/photos/black-audi-suv-mountain';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  }
}, (res) => {
  console.log("Status Code:", res.statusCode);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("Data size:", data.length);
    console.log("Preview:", data.slice(0, 500));
  });
}).on('error', (err) => {
  console.error("Error: " + err.message);
});
