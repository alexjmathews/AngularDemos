var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(4000);

console.log("Listening at port http://localhost:4000");