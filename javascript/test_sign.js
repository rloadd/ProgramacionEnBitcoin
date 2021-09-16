// Ejemplo de firmado y verificación de un mensaje. No se envía nada a la blockchain.
// Lo que podemos ver es el flujo de uso de las claves privada y la address o la publica indistintamente
// IMPORTANTE: se puede verificar con la address

var Message = require('bsv/message')
var bsv = require('bsv')
var privateKey = bsv.PrivateKey.fromRandom()

//PAra seguir el ejemplo de https://en.bitcoin.it/wiki/Technical_background_of_version_1_Bitcoin_addresses#How_to_create_Bitcoin_Address
privateKey = bsv.PrivateKey.fromString("18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725");

    
let publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
console.log(publicKey);
console.log(publicKey.toAddress().toString());
let publicKey2 = bsv.PublicKey.fromHex(publicKey.toString())
console.log(publicKey2.toAddress().toString());


var address = privateKey.toAddress()
console.log("address = " + address);
var message = "this is the message that i want to sign"
var sig = Message.sign(message, privateKey)
console.log(sig.toString())
// prints:
// H/kgM5HZYfmP9u1l50cuGwb/Hr3liZS8VfHg1JsL9EuHOux2n9pCStyPV0pOTKJp22ekSUeq8zRATOQvrORPw7E=
var verify = Message.verify(message, address, sig)
console.log(verify)
// prints:
// true
