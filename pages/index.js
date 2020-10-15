import { useEffect, useState } from 'react'
import { colors } from 'styles/theme'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import GitHub from 'components/icons/GitHub'

import { loginWithGitHub, onAuthStateChanged } from 'firebase/client'

import { useRouter } from 'next/router'

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
}

export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    // let's get the router from the router user HOOK
    user && router.replace('/home')
  }, [user]) // the effect should run every time the user changes

  const handleClick = () => {
    loginWithGitHub()
      // .then((user) => { do not need to setUser becasue we set the user information with onAuthStateChanged
      //   setUser(user)
      //   console.log(user)
      // })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <AppLayout>
        <section>
          <img src="/devter-logo.png" alt="logo" />
          <h1>Devter</h1>
          <h2>
            Talk about development <br />
            with developers
          </h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" height={24} width={24} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOW && <img src="/spinner.gif" />}
          </div>
        </section>
      </AppLayout>

      <style jsx>
        {`
          div {
            margin-top: 16px;
          }

          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }

          img {
            width: 120px;
          }

          h1 {
            color: ${colors.primary};
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 16px;
          }

          h2 {
            color: ${colors.secondary};
            font-size: 21px;
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
