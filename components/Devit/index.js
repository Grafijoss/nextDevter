import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'

export default function Devit(devit) {
  const { avatar, userName, content, id, createAt } = devit

  const timeAgo = useTimeAgo(createAt)
  //   const createdAtFormated = useDateTimeFormat(createdAt)

  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={userName} src={avatar}></Avatar>
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - </span>
            <date>{timeAgo}</date>
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

        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
