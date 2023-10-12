const express =  require('express');
require('dotenv').config();

const app = express();
app.use(express.static('dist'));

const path = require('path');

app.get('*',(req, res)=>{
  res.sendFile(path.resolve(__dirname,'dist','index.html'));
})

app.listen(process.env.PORT);
console.log(`app started at ${process.env.PORT}`);