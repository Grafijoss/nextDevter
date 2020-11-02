import { useState, useEffect } from 'react'

import Avatar from 'components/Avatar'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Button from 'components/Button'

import useUser from 'hooks/useUser'
// import { getDisplayName } from 'next/dist/next-server/lib/utils'

import { addDevit, uploadImage } from 'firebase/client'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCES: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState('')
  const [status, setSttaus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  // file will be a browser object
  // const [file, setFile] = useState(null)

  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    // si la tarea existe
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log('onComplete')
        // nos retorna la url de la imagen en el storage
        task.snapshot.ref.getDownloadURL().then((imageUrl) => {
          setImgURL(imageUrl)
        })
      }
      // llamamos al statte_changed  the firebase
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  const handleSubmit = (event) => {
    event.preventDefault()
    setSttaus(COMPOSE_STATES.LOADING)
    console.log('handleSubmit')
    console.log({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL, // añadimos la imagen al devit
    })
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL, // añadimos la imagen al devit
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.log(err)
        setSttaus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDragDrop = (e) => {
    // evitamos el evento por defecto del navegador
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    // estas llamadas a los eventos no siempre son sincronos
    // ellength files llega en 0
    // console.log(e.dataTransfer)

    // podemos llamar directamente a la posición de files y lo va a encontrar
    // nos va a retornar toda la información del archivo o archivos
    // console.log(e.dataTransfer.files[0])

    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  return (
    <>
      <Head>
        <title>Crear un Devit / Devter</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container ">
            <Avatar alt={user.userName} src={user.avatar}></Avatar>
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDragDrop}
            placeholder="¿Qué esta pasando?"
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitiar</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }
        button {
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }
        .form-container {
          align-items: flex-start;
          display: flex;
        }
        .remove-img {
          position: relative;
        }
        form {
          padding: 10px;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px solid transparent'};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
