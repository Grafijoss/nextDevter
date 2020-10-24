import Avatar from 'components/Avatar'

export default function Devit(devit) {
  const { avatar, userName, content, id, createAt } = devit

  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={userName} src={avatar}></Avatar>
        </div>
        <section>
          <header>
            <date>{createAt}</date>
            <strong>{userName}</strong>
          </header>
          <p>{content}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }

        p {
          margin: 0;
          line-height: 1.3125;
        }
      `}</style>
    </>
  )
}
