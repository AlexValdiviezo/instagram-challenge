# CHALENGE DE INSTAGRAM
## Ejecución de la aplicación:
- Para ejecutar la aplicación primero se debern pre configurar las "variables de entorno" que agregue en la ruta `./src/configs/env`<br>Dentro enontraremos un objeto como este: <br>
<code>
{
    urlApi: 'http://localhost:8080'
}
</code><br>
Lo unico que debemos hacer a continuacion es confirmar que la url sea la correcta del backend.

- Una vez finalizado el paso anterior proseguimos a abrir la carpeta en la consola y ejecutar el comando `npm i` para instalar los modulos.<br>

- Una vez instalado los modulos proseguimos a ejecutar el comando `npm run start` para iniciar la aplicacion.

- Una vez iniciada la aplicación debería estar hosteada en la ruta: `http://localhost:3000`

- Dato: Si se ejecutan tanto el servidor backend como el frontend en las misma maquina es fundamental asegurarse que los puertos sean diferentes. De otra forma una aplicación pisaría a la otra.
<br></br>
# Caracteristicas fundamentales

## Navbar
- El navbar cuenta con dos componentes el propio navbar seguido de un modal para la interacción con la subida de archivos por medio del icono +
- Los demas iconos no tienen funcionalidad.
- Una vez pulsado el boton de añadir. Se entrará en cola de espera hasta que la API nos responda para renderizar la aplicación.
- Al agregar una nueva publicación esta se enviará a la API para luego ser añadida a la base de datos.
- En el caso de que nos devuelva un error la API, saldrá un cartel indicando un error. En tal caso intentar nuevamente con campos correspondientes

## Body
- El cuerpo de la aplicación está compuesto por cartas de publicaciones. 
- El botón de administración de publicación se encuentra en la punta derecha de arriba de la carta. Este mismo sirve para eliminar o editar las publicaciones.
- Debajo de la publicación se encuentra el boton de likes para aumentar los mismos, enviando a su vez un request de actualización a la API.
- Debajo de los likes se encuentra el titulo o texto de descripción de la imagen.

## Estilos
Para los estilos utilicé css puro haciendo mucho uso del flexbox para un diseño responsivo y media querys para casos especiales en los que la aplicación no se veía a buena escala en dispositivos mobiles.
<br></br>
 
# HOST
- Actualmente la pagina esta hosteada en [Heroku App](https://instagram-challenge-sondeos.herokuapp.com)
- Con su API en [https://instagram-challenge-backend.herokuapp.com/api](https://instagram-challenge-backend.herokuapp.com/api)
- Documentación de la API: [Documentacion en GitHub](https://github.com/AlexValdiviezo/instagram-challenge-API)
