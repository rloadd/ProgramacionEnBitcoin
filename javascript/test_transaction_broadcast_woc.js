//let bsvRPC = require("bitcoin-sv-rpc");
//var data = { 'username': 'bitcoin', 'password': 'password', 'port': 18332, 'timeout': 1000, 'host': '127.0.0.1', 'debugging': false};
//let bsv = new bsvRPC(data.host, data.username, data.password, data.port, data.timeout, data.debugging);

var bsv = require('bsv')

//Ver ejemplo completo : https://github.com/bitpay/bitcore-lib/issues/113

var network = "testnet";

//Para conectar con el nodo BSV por RPC

//Format "From a pay to public key hash output"
var addresses = require('./addresses.json');
var datatx = { change: 'mmJsCgxjHAGw2pQ7CaG3yC8PEL1qng4Hu1', 'fee': 200, to: "mm9PA8RvgWR9NMq1fUn2eQFGSyGYPEnaUA", 'sats': 1000 };

//1.- Get fresh list of utxos for the addresses from WoC
//2.- Prepare json for bsv library
//3.- Build the TX
//4.- Serialize (checks & HEX)


var Woc = require("./lib/woc.js");

var promises = [];
var lst = Object.keys(addresses);
for(var addr in lst) {
    promises.push(Woc.unspent(lst[addr],"testnet"));
}

Promise.all(promises) 
.then(unspent => { 
    var data = undefined;
    for(var i = 0; !data && (i<unspent.length); i++) {
        if (unspent[i].length >0)  {
            console.log(unspent[i]);
            data = unspent[i][0]; //Suponemos que con una sola address es suficiente y ...
        }
    }
    if (!data) {
        console.log("No utxos disponibles");
        return;
    }
    console.log("unspent");
    console.log(data);
    
    data['amount'] = data['value']/100000000;   //... y suponemos que con un utxo es suficiente
    data['txId'] = data['tx_hash'];
    data['prevTxId'] = data['tx_hash'];
    data['outputIndex'] = data['tx_pos'];

    //https://docs.moneybutton.com/docs/bsv-script.html
    data['script'] = bsv.Script.fromAddress(data['address']);   //Hay que hacerlo por cada from
    
    var transaction = new bsv.Transaction()
        .from([data])          // Feed information about what unspent outputs one can use
        .to(datatx['to'], datatx['sats'])  // Add an output with the given amount of satoshis

    if (! datatx['fee']) { datatx['fee'] = transaction.getFee(); } 
    transaction
        .fee(datatx['fee'])
        .change(datatx['change'])                   // Sets up a change address where the rest of the funds will go
        .sign(addresses[data['address']]['privatek'])    // Signs all the inputs it can

    console.log(transaction.toJSON());
    console.log(transaction.serialize());

    //Enviar la TX a través de Whatsonchain
    Woc.broadcast(transaction.serialize(), network)
    .then(data => { 
        console.log(data);
    })
});


