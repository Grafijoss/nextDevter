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

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setSttaus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
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

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
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
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px0000;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
