import urllib.request
import re

url = "https://unsplash.com/s/photos/black-audi-suv"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Find Unsplash photo IDs. They usually look like images.unsplash.com/photo-123456789012-abcde
        matches = re.findall(r'https://images\.unsplash\.com/(photo-[a-zA-Z0-9\-]+)', html)
        unique_matches = list(set(matches))
        print("Found Unsplash IDs:")
        for m in unique_matches[:20]:
            print(f"- {m}")
except Exception as e:
    print("Error:", e)
