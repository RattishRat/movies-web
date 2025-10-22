
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;


const frontendRoot = path.join(__dirname, '..', 'frontend', 'movies'); 
const frontendPublic = path.join(frontendRoot, 'public'); 
const frontendSrcAssets = path.join(frontendRoot, 'src', 'assets'); 


app.use('/assets', express.static(frontendSrcAssets));


app.get('/api/movies', (req, res) => {
  const dataJsonPath = path.join(frontendPublic, 'data.json');
  fs.readFile(dataJsonPath, 'utf8', (err, raw) => {
    if (err) {
      console.error('Failed to read data.json', err);
      return res.status(500).json({ error: 'Unable to read data.json' });
    }
    try {
      const json = JSON.parse(raw);

      
      const transform = (value) => {
        if (Array.isArray(value)) return value.map(transform);
        if (value && typeof value === 'object') {
          const out = {};
          for (const k of Object.keys(value)) out[k] = transform(value[k]);
          return out;
        }
        if (typeof value === 'string') {
          
          const withoutDots = value.replace(/^\.\//, '').replace(/^\.\.\//, '');
          
          if (withoutDots.startsWith('assets/')) {
            return '/assets/' + withoutDots.slice('assets/'.length);
          }
          return value;
        }
        return value;
      };

      const transformed = transform(json);
      res.json(transformed);
    } catch (parseErr) {
      console.error('Invalid JSON in data.json', parseErr);
      return res.status(500).json({ error: 'Invalid JSON' });
    }
  });
});


app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Serving assets from: ${frontendSrcAssets}`);
});