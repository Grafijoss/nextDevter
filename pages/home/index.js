import AppLayout from 'components/AppLayout'
import { useEffect, useState } from 'react'

import Devit from 'components/Devit'
import useUser from 'hooks/useUser'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  const user = useUser()

  useEffect(() => {
    user &&
      fetch('/api/statuses/home_timeline')
        .then((res) => res.json())
        .then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(({ username, avatar, message, id }) => {
            return (
              <Devit
                key={id}
                username={username}
                avatar={avatar}
                message={message}
                id={id}
              ></Devit>
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 40px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}

// backdrop-filter: blur(5px); blur with opacity