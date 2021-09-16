
var bsv = require('bsv')

//Ver ejemplo completo : https://github.com/bitpay/bitcore-lib/issues/113
var network = "testnet";

var Mnemonic = require('bsv/mnemonic');
var Woc = require("./lib/woc.js");
var Wallet = require("./lib/wallet.js");

//Format "From a pay to public key hash output"

//1.- Get fresh list of utxos for the addresses from WoC
//2.- Prepare json for bsv library
//3.- Build the TX
//4.- Serialize (checks & HEX)


function balanceUser(user) {

    //Obtenemos los utxos del sender
    var promises = [];
    var addresses =  Wallet.deriveAddress( bsv.HDPrivateKey.fromSeed(Mnemonic.fromString(user['words']).toSeed()) , 
                        network, 'receive',
                        0,
                        user['paths']);
    for(var addr in addresses)  {
        promises.push(Woc.unspent(addresses[addr],network));
    }

    return Promise.all(promises) 
    .then(unspent => { 
        return Wallet.sumUnspent(unspent);
    });
}


var users = require('./users.json');
balanceUser(users['u1']).then(balance => { console.log("Balance u1 = " + balance/1e8 + " BSV") } );
balanceUser(users['u2']).then(balance => { console.log("Balance u2 = " + balance/1e8 + " BSV") } );

