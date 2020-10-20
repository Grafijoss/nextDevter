import AppLayout from 'components/AppLayout'
import Button from 'components/Button'

import useUser from 'hooks/useUser'

export default function ComposeTweet() {
  useUser()

  return (
    <>
      <AppLayout>
        <form>
          <textarea placeholder="¿Qué esta pasando?"></textarea>
          <div>
            <Button>Devitiar</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
