const express = require('express');
const { PORT } = require('./configs');

const app = express(); 

app.get('/', (req, res) => { 
  res.send('Hello')
}); 

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})