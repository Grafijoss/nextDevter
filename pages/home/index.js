import AppLayout from 'components/AppLayout'
import { useEffect, useState } from 'react'

import Devit from 'components/Devit'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  useEffect(() => {
    fetch('/api/statuses/home_timeline')
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

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
          border-bottom: 1px solid #ccc;
          display: flex;
          height: 49px;
          position: fixed;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 40px;
          position: fixed;
          width: 100%;
        }

        section {
          padding-top: 49px;
        }
      `}</style>
    </>
  )
}
