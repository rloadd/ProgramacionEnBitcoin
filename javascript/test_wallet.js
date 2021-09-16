

var seed = "appear film boil narrow sleep front nurse future utility cat whale loud";
seed = "switch upper twice birth kid holiday drift creek mammal build soup obtain library thing way bench motion shallow sign depart iron boring couch aspect"


const bsv = require("bsv");
var Mnemonic = require('bsv/mnemonic');

//Importamos la privada
var r = require("./lib/wallet.js");
var hdPrivateKey = bsv.HDPrivateKey.fromSeed(Mnemonic.fromString(seed).toSeed())


start = 0;
qty = 10;
/* 
for (let i = 1; i<250; i=i+1) {
     mpath =  "m/44'/" + i + "'/0'/";
    console.log(r.deriveAll(hdPrivateKey, 'mainnet', mpath, 'receive',start,qty));
    console.log(r.deriveAll(hdPrivateKey, 'mainnet', mpath, 'change',start,qty));
}
return; 
*/

mpath =  "m/44'/145'/0'/";
console.log(r.deriveAll(hdPrivateKey, 'mainnet', mpath, 'receive',start,qty));
console.log(r.deriveAll(hdPrivateKey, 'mainnet', mpath, 'change',start,qty));


