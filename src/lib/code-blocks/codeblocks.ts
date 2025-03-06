export const curlExample = `# List all brains
curl -H "x-api-key: YOUR_API_KEY" http://localhost:3000/api/brains

# Look for a match in a specific brain
curl -X POST \\
  -H "x-api-key: VtMZWBWyDjBmYlUShaTXbyCoerZhcXLAJZpSapJGaaLDZNkAsvIJEgAJFvCBmfay" \\
  -H "Content-Type: multipart/form-data" \\
  "http://localhost:3000/api/brains/cm7xn325d0001jxdrbdwdry1h/match" \\
  -F "file=@Anushka Sharma_1.jpg"`

export const javascriptExample = `const API_KEY = 'YOUR_API_KEY';

// List all brains
fetch('http://localhost:3000/api/brains', {
  headers: {
    'x-api-key': API_KEY
  }
})
`

export const pythonExample = `import requests

API_KEY = 'YOUR_API_KEY'
headers = {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json'
}

# List all brains
response = requests.get(
    'http://localhost:3000/api/brains',
    headers=headers
)`
