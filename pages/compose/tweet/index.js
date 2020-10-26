import Head from 'next/head'
import { useRouter } from 'next/router'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'

import useUser from 'hooks/useUser'
// import { getDisplayName } from 'next/dist/next-server/lib/utils'
import { useState } from 'react'

import { addDevit } from 'firebase/client'

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

  //   const [task, setTask] = useState(null)
  //   const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

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
    })
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
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
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDragDrop = (e) => {
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDragDrop}
            placeholder="¿Qué esta pasando?"
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devitiar</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        padding {
          margin: 10px;
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
