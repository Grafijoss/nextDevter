import Devit from 'components/Devit'

export default function DeviPage(props) {
  console.log('estas son las props de la pagina')
  console.log(props)
  return (
    <>
      <Devit {...props}></Devit>
    </>
  )
}

// es el metodo mas famoso
// va a dejar de funcionar
// tiene que ser una propiedadd estatica
// sirve con funciones o clases
// funciona igual con funciones y clases
// retorna una funcion
// se va a hacer el data fetching desde el servidor
// desde el cliente se pasa de una pagina a otra

// recibe un parametro context
DeviPage.getInitialProps = (context) => {
  // si vemos la consola en el terminal
  // se esta ejecutando en el servidor
  // la pagina se esta reenderizando desde el servidor
  // si se ve en la consaola del navegador cliente
  //   console.log('getiniatlprops')

  // context tiene
  // pathName  es la ruta actual
  // query donde sacamos los segmentos de la url
  // request y response
  // err error mientras se esta reenderizando

  const { query, res } = context
  const { id } = query

  console.log('getInitialProps', id)

  // lo que se retorna desde getInitialProps
  // llega como props a la pagina
  // rehidratación
  // desde el servidor se  retorna un string
  // cuando el componente de react recibe los props
  // actualiza se rehidrata
  // el html viene del servidor
  // se rehidrata con los propps

  // en este caso la respuesta es sincrona
  // return id

  // puede ser asincrono retornando una promesa
  // las rutas deben ser absolutas
  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    // si la respuesta es ok
    // comvertimos la respuesta a json()
    if (apiResponse.ok) return apiResponse.json()
    // podemos controlar los errores
    // el objeto re so respoonde solo lo tenemos en el servidor

    if (res) {
      // redireccion
      console.log('el response existe desde el servidor')
      // la pagina no existe
      // res.writeHead(404).end()
      // podemos redirigirlo a otra pagina
      res.writeHead(301, { location: '/' }).end()
    }
  })
}
