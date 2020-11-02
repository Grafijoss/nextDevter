import { firestore } from 'firebase/admin'

// tiene que devolver una funcion
// la funcion es sincrona
// se puede volver asincrona

export default (request, response) => {
  // recibimos dos parametros
  // el request y response

  // recuperamos esta informacion desde la url
  // dentro de la query tenemos todos los segmentos
  const { query } = request
  const { id } = query

  // tenemos que buscar el documento en el firestore

  firestore
    .collection('devis')
    // busca el id dentro de la coleccion
    .doc(id)
    // una vez lo encuentre quiero que lo recupere
    .get()
    // nos retorna un objeto completo de firestore
    .then((doc) => {
      // tenemos que llamar un metodo
      // para extraer la informacion
      const data = doc.data()
      // retornamos data
      response.json(data)
    })
    // debemos 9controlar que pasa
    // cuando no existe el dcocumento
    .catch(() => {
      // debemos terminar la respuesta con .end()
      response.status(404).end()
    })
}
