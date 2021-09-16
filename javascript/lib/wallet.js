const bsv = require("bsv");
var Mnemonic = require('bsv/mnemonic')

let pre = "m/44'/236'/0'/";        //Estandarizamos el path
let types = { receive: '0', change: '1' };

function Wallet(mpath) {
    if (!(this instanceof Wallet)) {
        return new Wallet()
    }
    this.mpath = mpath === undefined ? pre : mpath;
    return this
};


//From 12 words to seed
Wallet.HDPrivateKeyfromSeed = function (seed) {
    return bsv.HDPrivateKey.fromSeed(seed);
}

//https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
Wallet.mpath = function (coin_type, account) {
    return "m/44'/" + coin_type + "'/0'/" + account + "/";
}

function mpath_full(mpath, type, pos)  {
    //return  mpath + types[type] + ( hardened ? "'/" + pos + "'" : "/" + pos); 
    return  mpath + types[type] +"/" + pos ; //+ "'"; 
}


//Genera tantas address como se necesiten. Vamos a tener 2 cadenas de derivación
//La privada en formato WIF (no seed, no objeto)
Wallet.deriveAll = function (_hdPrivateKey, _network, _mpath, _type, _start, _qty) {
    let priv = '';

    //Permite 12w y hdprivatekey
    if (Mnemonic.isValid(_hdPrivateKey)) {
        let seed = Mnemonic.fromString(_hdPrivateKey).toSeed('').toString('hex');
        _hdPrivateKey = bsv.HDPrivateKey.fromSeed(seed);
    }

    if (types[_type]) {
        let list = {};
        let path;
        let a;
        for(let i = _start; i - _start < _qty; i++) {
            path = mpath_full(_mpath, _type, i);
            console.log(path);
            
            //Derivamos una privada cada vez
            xpriv = _hdPrivateKey.deriveChild(path); 
            priv = xpriv.privateKey;
            console.log(`priv = ${xpriv.toString()}, ${xpriv.privateKey}`);
            a = bsv.Address.fromPublicKey(bsv.HDPublicKey.fromHDPrivateKey(xpriv.toString()).publicKey,_network).toString();
            list[path] = [a,xpriv.toString(),priv.toString(),bsv.HDPublicKey.fromHDPrivateKey(xpriv.toString()).publicKey.toString()];
        }
        return list;
    } 
    return [];
}

//Genera tantas address como se necesiten. Vamos a tener 2 cadenas de derivación
//La privada en formato WIF (no seed, no objeto)
Wallet.deriveAddress = function (_hdPrivateKey, _network, _mpath, _type, _start, _qty) {

    //Permite 12w y hdprivatekey
    if (Mnemonic.isValid(_hdPrivateKey)) {
        let seed = Mnemonic.fromString(_hdPrivateKey).toSeed('').toString('hex');
        _hdPrivateKey = bsv.HDPrivateKey.fromSeed(seed);
    }

    if (types[_type]) {
        let list = [];
        let path;
        let a;
        for(let i = _start; i - _start < _qty; i++) {
            path = mpath_full(_mpath, _type, i);
            console.log(path);
            
            //Derivamos una privada cada vez
            let xpriv = _hdPrivateKey.deriveChild(path); //.toString();
            a = bsv.Address.fromPublicKey(bsv.HDPublicKey.fromHDPrivateKey(xpriv.toString()).publicKey,_network).toString();
            list.push([a,path]);
        }
        return list;
    } 
    return [];
}

//Genera tantas address como se necesiten. Vamos a tener 2 cadenas de derivación
//La privada en formato WIF (no seed, no objeto)
Wallet.derivePrivate = function (_hdPrivateKey, _network, _mpath, _type, _start, _qty) {
    let priv = '';
    //Permite 12w y hdprivatekey
    if (Mnemonic.isValid(_hdPrivateKey)) {
        let seed = Mnemonic.fromString(_hdPrivateKey).toSeed('').toString('hex');
        _hdPrivateKey = bsv.HDPrivateKey.fromSeed(seed);
    }

    if (types[_type]) {
        let list = [];
        let path;
        let a;
        for(let i = _start; i - _start < _qty; i++) {
            path = mpath_full(_mpath, _type, i);
            
            //Derivamos una privada cada vez
            xpriv = _hdPrivateKey.deriveChild(path); //.toString();
            list.push([xpriv.privateKey.toString(),path]);
        }
        return list;
    } 
    return [];
}

//Genera tantas address como se necesiten. Vamos a tener 2 cadenas de derivación
Wallet.derivePublicKey = function (_hdprivateKey, _network, _mpath, _type, _start, _qty) {
    //Permite 12w y hdprivatekey
    if (Mnemonic.isValid(_hdPrivateKey)) {
        let seed = Mnemonic.fromString(_hdPrivateKey).toSeed('').toString('hex');
        _hdPrivateKey = bsv.HDPrivateKey.fromSeed(seed);
    }

    if (types[_type]) {
        let list = {};
        let path;
        let a;
        for(let i = _start; i - _start < _qty; i++) {
            path = _mpath + types[_type] + "'/" + i + "'"; 
            a = bsv.HDPublicKey.fromHDPrivateKey(_hdprivateKey.deriveChild(path).toString(),_network).toString();
            list[path] = [a];
        }
        return list;
    } 
    return [];
}

// API CRYPTO 
//Get a random bip39 
Wallet.random_mnemonic = function () {
	return Mnemonic.fromRandom().toString();
};


// Basico, buscar un utxo con saldo para el envio
Wallet.findUnspentGreater = function (unspent, sats_amount, sats_fee) {
    var value = sats_amount + sats_fee ;
    console.log("umbral = " + value);
    for(var i=0; i<unspent.length; i++) {
        var u = unspent[i];
        for(var j=0; j<u.length; j++) {
            if (value <= u[j]['value'])
                return [i,j];
        }
    }
}


// Basico, sumar todos los unspent
Wallet.sumUnspent = function(unspent) {
    var value = 0;
    for(var i=0; i<unspent.length; i++) {
        var u = unspent[i];
        for(var j=0; j<u.length; j++) {
            value =value +  u[j]['value'];
        }
    }
    return value;
}

//Syntacthical validity
Wallet.isValidAddress = function (addr, network) {
    return bsv.Address.isValid(addr,network)
}

module.exports = Wallet;
