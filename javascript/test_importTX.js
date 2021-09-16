//Ejemplo de importación de una transacción

//Es importante ver que:
// * la librearia bsv nos permite importar una HEX de una transacción y decodificarla
// * La disección de una transacción es agnśtica de la red donde se ha emitido o se va a emitir
// * Una vez importada podemos tratar el objeto. En este caso se le ha cambiado el fee a 5000
// * Una transacción no muestra el fee cuando se importa y es porque el fee es el resto de inputs - outputs. Ojo con eso.


var bsv = require('bsv')
var tt = "01000000015f36257bbf74c9293b199c4d65ed1c61ab34fcb30780277fbdebcb5df44afc16000000006a4730440220752f8746f4878f7b790e99f04d3926d9ee5fb6ff62fd78fe0cfc50e56e8302d60220450103a732a118d4847dc7dfbead37630c11a2e5084ab9bedc6efcad3dcb63fc412102d866b20092e0e4d6df6da393cc464f4621279201a7aaeb7b5b274ee646959084ffffffff021e4e0000000000001976a914a48ee4320d5d965cfcf840c4a28c6c8d31422d9588ac2a26dd62b22102001976a914f78f94a76d7765894aab4c442f5f913d806a74a288ac00000000";
var tx = bsv.Transaction(tt);
console.log(tx.toJSON());
console.log(tx.fee(5000).toJSON());
console.log(tt);
console.log(tx.toString());

