import https from 'https';

const url = 'https://unsplash.com/napi/search/photos?query=black%20audi%20suv&per_page=25';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.results) {
        console.log("Found photos:");
        parsed.results.forEach((photo, idx) => {
          console.log(`\n--- Photo ${idx + 1} ---`);
          console.log(`ID: ${photo.id}`);
          console.log(`Description: ${photo.description || photo.alt_description}`);
          console.log(`URL: ${photo.urls.regular}`);
        });
      } else {
        console.log("No results found or rate limited.", data.slice(0, 200));
      }
    } catch (e) {
      console.error("Error parsing JSON:", e.message);
    }
  });
}).on('error', (err) => {
  console.error("Error: " + err.message);
});
