

var https = require('https'),
    http = require('http'),
    fs = require('fs');
    //stream = require('stream');


//Descarga promisificada
var bl   = require('bl');
function promiseLoad(url, httpclient) {
    var body = '';
    return new Promise(function(resolve, reject) {
        httpclient.get(url, function (response) {
            response.setEncoding('utf8');
            response.pipe(bl(function (err, data) {
                if (err) { console.log(err) }
               resolve(data.toString())
            }))
        })
    });
}

function promisePOST(options, data, httpclient) {
    return new Promise(function(resolve, reject) { 
        // do the usual XHR stuff 
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var req = new XMLHttpRequest();
        var url = "https://"+options.hostname+options.path; 
        req.open('post', url); 
        //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING 
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.onload = function() { 
            //console.log(req);
            if (req.status == 200) { 
                resolve(req.responseText); 
                return req.responseText; 
            } else { 
            reject(Error(req.statusText)); 
            } 
        }; 
        // handle network errors 
        req.onerror = function() { 
            reject(Error("Network Error")); 
        }; // make the request 
        req.send(data); 
    });
}


function Woc() {
    if (!(this instanceof Woc)) {
        return new Woc()
    }
    return this
}


Woc.unspent = function(address, network) { 
    //var network = "main";
    if (network == "testnet") { network = "test"; }

    var urljson = "https://api.whatsonchain.com/v1/bsv/"+network + "/address/"+ address + "/unspent";
    //console.log(urljson);
    return promiseLoad(urljson,https)
    .then(function(jsondata)  {
        var jsonObj = JSON.parse(jsondata);
        for(var i=0;i<jsonObj.length; i++) {
            jsonObj[i]['address'] = address;
        } 
        return(jsonObj);
    });
};

Woc.broadcast = function(txhex, network) {
    if (network == "testnet") { network = "test"; }

    //POST https://api.whatsonchain.com/v1/bsv/<network>/tx/raw
    var urljson = "https://api.whatsonchain.com/v1/bsv/"+network + "/tx/raw";

    const data = JSON.stringify({
      txhex: txhex
    })

    const options = {
        hostname: "api.whatsonchain.com",
        port: 443,
        path: "/v1/bsv/"+network + "/tx/raw",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        },
    } 
    //console.log(options);

    return promisePOST(options, data, https)
    .then(function(jsondata)  {
        return(jsondata);
    });
};


module.exports = Woc
