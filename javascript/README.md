
# Ejemplos 

De lo visto en clase hemos hecho una selección de ejemplos en Javascript.

IMPORTANTE: es tu responsabilidad asegurarte de que generas claves y direcciones para la cadena correcta. Ten encuenta la "network" y la cadena de derivación. Las claves y semillas que encuentre en estos scripts no son seguras.



## Instalación de requisitos

Se requiere nodejs instalado. El fichero package.json indica las dependencias que necesitamos. Por lo tanto le decimos que los instale.

```
npm i
```


## Probar

Se trata de scripts con los que jugar. Se ejecutan sin dificultad en linea de comandos:


```
node test_wallet.js
```


## Cadenas y librerías

Los scripts que empiezan por test_* hacen uso de la librería "bsv". Por defecto trabajan derivando y formateando claves para esa cadena. Los restantes usarn "bitcoinjs-lib" y generan los ejemplos sobre BTC. Ambas librerías son equivalentes en cuestión de generación de claves y direcciones aunque hay que personalizar un poco más los scripts para que cambie de cadena. 


