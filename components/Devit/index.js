import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Devit(devit) {
  const { avatar, userName, content, id, img, createAt } = devit

  const timeAgo = useTimeAgo(createAt)
  const createdAtFormated = useDateTimeFormat(createAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    // se debe pasar la ruta
    // despiues se debe pasar la ruta dinamica
    router.push('/status/[id]', `/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick} key={id}>
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

        article:hover {
          background: #ccc;
          cursor: pointer;
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
