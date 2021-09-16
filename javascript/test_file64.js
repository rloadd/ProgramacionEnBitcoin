var f64 = require('./lib/file64');

// convert image to base64 encoded string
var file = "logo.png";
//file = "bsv.jpg";
file="100k.dump";

var base64str = f64.base64_encode( file );
console.log(base64str);
// convert base64 string back to image 
//base64_decode(base64str, 'copy.jpg');
