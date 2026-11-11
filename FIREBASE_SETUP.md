# Terminar de configurar la galeria compartida

La configuracion web del proyecto `apiproject-1b89e` ya esta en `index.js`. Firebase Authentication permite que solo la cuenta autorizada suba archivos y Firebase Storage los comparte. Los archivos del carrusel son publicos para poder verlos sin iniciar sesion.

1. En Firebase Console, abre el proyecto `apiproject-1b89e`.
2. En Authentication, habilita el proveedor Correo electronico/Contrasena. En `Propuesta-login.html`, crea el perfil con `dannasmp44@gmail.com` y una contrasena unica de al menos 12 caracteres. Confirma el correo antes de iniciar sesion para administrar la galeria.
3. En Storage, crea el bucket `apiproject-1b89e.firebasestorage.app` si aun no existe.
4. Publica el contenido de `firebase-storage.rules` en la pestana Rules de Firebase Storage. Las reglas autorizan solo el correo verificado `dannasmp44@gmail.com`.
5. Publica el sitio por HTTPS y agrega su dominio a los dominios autorizados de Firebase Authentication.
6. Abre el mismo sitio desde tus dispositivos. Inicia sesion en el dispositivo desde el que quieras subir fotos o videos.

La configuracion web de Firebase se puede incluir en el sitio. Las reglas de Storage son las que restringen las subidas. No uses fechas como contrasena ni la compartas en el codigo.

Propuesta usa el mismo inicio de sesion y la misma carpeta `recuerdos/` para fotos y videos. En la pagina, pulsa el corazon de la galeria e inicia sesion como `dannasmp44@gmail.com`. El panel permite subir archivos, organizar la galeria, quitar elementos y editar textos, carta, fotos y encuadre de portada.

El orden y los elementos locales ocultos se guardan en `config/propuesta-galeria.json`; los textos y ajustes de imagen se guardan en `config/propuesta-contenido.json`. Ambos se pueden leer publicamente y solo la cuenta verificada puede modificarlos. Publica las reglas actualizadas de `firebase-storage.rules`; sin ellas se podran ver los medios, pero no guardar estos cambios ni eliminar archivos subidos.