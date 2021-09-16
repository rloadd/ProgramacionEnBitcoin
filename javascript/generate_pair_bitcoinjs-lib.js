


const bitcoin = require('bitcoinjs-lib')
const keyPair = bitcoin.ECPair.makeRandom()

//console.log(keyPair);
console.log("Clave privada generadas aleatoriamente\n");
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
console.log("address \t" + address) // 17wqX8P6kz6DrDRQfdJ9KeqUTRmgh1NzSk
var publicKey = keyPair.publicKey.toString('hex')

console.log("public key \t" + publicKey) // 0279bf075bae171835513be1056f224f94f3915f9999a3faea1194d97b54397219

var wif = keyPair.toWIF()
console.log("private key WIF " + wif) // 200424e3612358db9078760d4f652a105049187c29f2d03d7d65bc9e27a007d0


const bip32 = require('bip32');

const xpub = 'xpub6CzDCPbtLrrn4VpVbyyQLHbdSMpZoHN4iuW64VswCyEpfjM2mJGdaHJ2DyuZwtst96E16VvcERb8BBeJdHSCVmAq9RhtRQg6eAZFrTKCNqf';

console.log("xpub \t\t" + bip32.fromPrivateKey(keyPair.privateKey,Buffer.from("84cf7d9029cdd9fcadbb3717fd92ec0db7d7d9787c57c13c08fc887c389b566b", "hex")).neutered().toBase58(),"\n");


for (let i=0; i<20; i=i+1) {

    let p = bitcoin.payments.p2pkh({ pubkey: bip32.fromBase58(xpub).derive(i).derive(1).publicKey, });
    //console.log(p);
    console.log(`address ${i}/1: \t${p.address}`);
}



