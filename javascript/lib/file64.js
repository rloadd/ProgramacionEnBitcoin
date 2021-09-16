var fs = require('fs');


function File64() {
    if (!(this instanceof File64)) {
        return new File64()
    }
    return this
}


// function to encode file data to base64 encoded string
File64.base64_encode = function(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

// function to create file from base64 encoded string
File64.base64_decode = function (base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer.from(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    //console.log('******** File created from base64 encoded string ********');
}

module.exports = File64
