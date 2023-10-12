const express =  require('express');

const app = express();
app.use(express.static('build'));

const path = require('path');

app.get('*',(req, res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'));
})

const PORT = 5000;
console.log("app started at 5000");
app.listen(PORT)