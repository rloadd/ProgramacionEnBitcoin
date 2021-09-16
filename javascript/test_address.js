// Ejemplo de verificación de direcciones. No se envía nada a la blockchain.
// Una address tiene diferente forma según la network, y si es de tupo pubkey o ps2sh

var bsv = require('bsv')

var addr = [ 
        [ "mrXWUSkxRHegBpLCSFeAU9FPxMaND2TkB4", "testnet", "true" ] ,
        [ "mrXWUSkxRHegBpLCSFeAU9FPxMaND2TkB4", "test" , "mal el nombre de la red"] ,
        [ "mrXWUSkxRHegBpLCSFeAU9FPxMaND2TkB4", "mainnet" , "es de testnet no de mainnet"] ,
        [ "mrXWUSkxRHegBpLCSFeAU9FPxMaND2TkB", "testnet", "le he quitado un digito"], 
        [ "15vkcKf7gB23wLAnZLmbVuMiiVDc1Nm4a2", "livenet" , "otra red"] 
];

for(a in addr) {
    console.log (addr[a],bsv.Address.isValid(addr[a][0],addr[a][1]),"\n");
}
