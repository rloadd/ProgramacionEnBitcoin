
# Intro

docker-compose es una utilidad para arracar uno o varios contenedores usando una configuración de orquestación en formato .yml.

Cuando ejecutamos

```
docker-compose up
```

Se busca la instancia docker-compose.yml en la carpeta actual y si no se desciende, llegando hasta la raiz del sistema de ficheros si no se encuentra antes.

Para ejecutar el nodo de BitcoinSV entramos en su directorio y ejecutamos el comando anterior. Lo propio con BTC.


# Resultado

Podrán convivir los datos sincronizados de cada nodo puesto que van a alojarse en una subcarpeta.  Estos datos crecerán rápidamente y ocuparán espacio en disco duro. Para eliminar esa información bastaría con conservar el fichero bitcoin.conf y el docker-compose.yml.


# Resincronizar

Si se detiene el nodo o lo detenemos forzosamente, se puede rearrancar sin problemas en la mayoría de los casos. Dependerá del motivo de la parada. En ese caso cargará lo que tenía e intentará empezar por el mismo punto en el se quedó.


