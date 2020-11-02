// en esta archivo pagamos el codigo
// que nos genera
// firebase/proyecto/configuracion/configuracion del proyecto/cuentas de servicio

// tenemos que instalar esta dependencia
// yarn add firebase-admin
var admin = require('firebase-admin')

//  se encarga de importar las claves de firebase
// esta es la clave privada que descargamos desde firebase
var serviceAccount = require('./firebase-keys.json')

// inicializamos la aplicación desde el servidor
// pasamos las credenciales
// y la url de nuestra base de datos
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://devter-c8137.firebaseio.com',
  })
} catch (e) {
  console.log('este es el error')
  console.log(e)
}

// hemos inicializado toda la cuenta de servicio
// para definir que servicio vamos a inicializar
// solo necesitamos el servicio de firestore
export const firestore = admin.firestore()
