import Devit from 'components/Devit'
import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'

export default function DeviPage(props) {
  const router = useRouter()

  // podemos verificar que el parametro existe
  // y en el caso de que no exista
  // mientras next genera el nuevo archivo estatico
  // genera al vuelo archivos estaticos
  // lo genera bajo demanda
  // podemos mostrar un spinner
  // tambien podemos usar el router
  // if (!props.id) return 'Loading'
  // y verificar si estamos en estado fallback
  if (router.isFallback) return '...Loading'
  // si alguien ha generado esa pagina estatica
  // ya no debe generarla nuevamente
  // nunca mas entrara al if
  if (!props.id) return 'Loading'
  return (
    <>
      <Devit {...props}></Devit>
    </>
  )
}

// segenera una sola vez
// se genera en el build time
// le vamos a decir que paths
// tiene que hacer que funcione el recupera la informacion
// por que tiene que generar el html de cada una de las paginas
// cuando es dinamico
// por eso tenemos que decirle a getStaticProps
// cuales son los paths que tiene que generar

export async function getStaticPaths() {
  // retornamos un objeto con una lista
  // a de todos los paths que debe generar
  // y el fallback

  return {
    paths: [
      {
        params: { id: 'AxJ5YHMAgb16WvIKUCwo' },
      },
    ],
    // si el fallback es false
    // y el path no existe
    // retorna 404

    // si fallback es tru
    // reotrna un error diferente
    // por que intenta reenderizar la aplicación
    // aunque el path no existe
    // si no hace match
    // next intentara generar el archivo en el servidor
    // si no el va a tratar de reenderizar
    // con la información que tiene
    fallback: true,
  }
}

// se ejecuta en build time
// npm run build
// tenemos que acompañar este metodo
// con el metodo getStaticPaths
export async function getStaticProps(context) {
  // en lugar de query recibe params
  // params, req, query
  const { params } = context
  const { id } = params

  // el api de fetch no existe dn build time
  // tenemos que llamar el firestore para que funcione

  return (
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
        const id = doc.id
        const { createAt } = data
        // retornamos data
        const props = {
          ...data,
          id,
          createAt: +createAt.toDate(),
        }
        // tenemos que devolver um objeto
        // con el key props y dentro las props de apiResponse
        // por que podemos retornar mas informacion
        return {
          props,
        }
      })
      // debemos 9controlar que pasa
      // cuando no existe el dcocumento
      .catch(() => {
        // debemos terminar la respuesta con .end()
        return { props: {} }
      })
  )
}

/* getServerSideProps

// en lugar de ser la propiedad de un componente
// vamos a exportar como constante
// podemos usar async para llamados asincronos
// recibe un parametro context

export async function getServerSideProps(context) {
  // en lugar de query recibe params
  // params, req, res, query
  const { params, res } = context
  const { id } = params

  // puede ser asincrono retornando una promesa
  // las rutas deben ser absolutas

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    // tenemos que devolver um objeto
    // con el key props y dentro las props de apiResponse
    return {
      props,
    }
  }
  if (res) {
    // redireccion
    console.log('el response existe desde el servidor')
    // la pagina no existe
    // res.writeHead(404).end()
    // podemos redirigirlo a otra pagina
    res.writeHead(301, { location: '/' }).end()
  }
}

/*

/* getInitialProps

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
	// devuelve un objeto que directamente va como props
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
 */
