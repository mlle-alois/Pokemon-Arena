
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(__dirname+'/dist/Pokemon-Arena'));
app.get('/*', function(req,res) {res.sendFile(path.join(__dirname + '/dist/Pokemon-Arena/index.html'));});
app.listen(process.env.PORT || 8080);


const port2 = 'OUIIIII' || "NOOOON";

if(false){
  console.log("fegejngjebngehjkrgkhregnb");
}


