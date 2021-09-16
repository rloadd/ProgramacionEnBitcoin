

# Ejemplo basado en "bitcoin-in-tiny-pieces"

Está escrito en python. Para Linux y MacOS:

```
git clone https://github.com/circulosmeos/bitcoin-in-tiny-pieces
cd bitcoin-in-pieces
python -m pip install base58
bash bitcoin-test-address-balance.sh 
```


Se recomienda seguir el README.md del propio repositorio. Hay instrucciones para usuarios de Windows.

Encontramos scripts para:

  - Generar claves públicas desde la privada
  - Generar address desde la clave pública
  - Obtener el balance de un address BTC usando la API de bitcoin.com 


El uso de la API se localiza en "bitcoin-test-address-balance.sh"


```
        htmlfile = urlopen("https://blockchain.info/address/%s?format=json" % address, timeout = 10)
```

En este caso no se descargan UTXO si no el balance resultante calculado por bitcoin.com


Estos scripts se pueden ejecutar asilados o con un pipe que los encadena. Como se ve aceptan un parámetro posiciona y retornan un único resultado por salida estándar.  




