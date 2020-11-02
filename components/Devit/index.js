import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Link from 'next/link'

export default function Devit(devit) {
  const { avatar, userName, content, id, img, createAt } = devit

  const timeAgo = useTimeAgo(createAt)
  const createdAtFormated = useDateTimeFormat(createAt)

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
            {/* si el path tiene un segmento dinamico */}
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeAgo}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
        }

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        div {
          padding-right: 10px;
        }

        p {
          margin: 0;
          line-height: 1.3125;
        }

        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
